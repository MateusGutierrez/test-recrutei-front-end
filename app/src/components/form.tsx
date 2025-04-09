import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { CalendarIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import useTaskStore from '@/store';
import { v4 as uuidv4 } from 'uuid';
import { columns } from './column';
import { head } from 'lodash';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

const formSchema = z.object({
  task: z.string().min(2).max(50),
  description: z.string().min(5).max(300),
  admin: z.array(z.string()).min(1),
  date: z.date()
});

const adminOptions = ['Matheus Gomes', 'Pedro Paulo', 'Paulo'];

interface Props {
  hide: () => void;
}

const TaskForm: React.FC<Props> = ({ hide }) => {
  const { addTask } = useTaskStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      description: '',
      admin: [],
      date: undefined
    },
    mode: 'onChange'
  });
  const { isValid } = form.formState;

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      addTask({
        ...values,
        id: uuidv4(),
        columnId: head(columns)?.id as string
      });
      toast.success('Tarefa adicionada com sucesso!');
      form.reset();
      hide();
    },
    [addTask, form, hide]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-700 text-[#747F93] text-[12px]">
                Título da tarefa
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-[40px] w-full rounded-[16px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-700 text-[#747F93] text-[12px]">
                Descrição da tarefa
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-[134px] w-full rounded-[24px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admin"
          render={() => (
            <FormItem>
              <FormLabel className="font-700 text-[#747F93] text-[12px]">
                Responsáveis
              </FormLabel>
              <Select
                onValueChange={value => {
                  const current = form.getValues('admin');
                  const isSelected = current.includes(value);
                  const updated = isSelected
                    ? current.filter(item => item !== value)
                    : [...current, value];

                  form.setValue('admin', updated, { shouldValidate: true });
                }}
              >
                <FormControl>
                  <SelectTrigger className="cursor-pointer w-full rounded-[16px]">
                    <SelectValue
                      children={
                        form.watch('admin').join(', ') ||
                        'Selecione responsáveis'
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {adminOptions.map(admin => {
                    const selected = form.watch('admin').includes(admin);
                    return (
                      <SelectItem
                        key={admin}
                        value={admin}
                        className="flex items-center justify-between cursor-pointer w-full"
                      >
                        {admin}
                        {selected && (
                          <Check className="h-4 w-4 text-green-600 justify-self-end w-full" />
                        )}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col w-fit">
              <FormLabel className="font-700 text-[#747F93] text-[12px] w-fit">
                Data limite
              </FormLabel>
              <Popover>
                <PopoverTrigger>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      type="button"
                      className={cn(
                        'cursor-pointer flex justify-self-start w-[204px] rounded-[16px] text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span className="text-[#ADB8CB] font-[12px]">
                          Data:
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-[#ADB8CB]" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value as Date}
                    onSelect={field.onChange}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer w-full rounded-[99px] h-[40px]"
          disabled={!isValid}
        >
          Adicionar tarefa
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
