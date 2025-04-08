import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';

const formSchema = z.object({
  task: z.string().min(2).max(50),
  description: z.string().min(5).max(300),
  admin: z.string().min(1),
  date: z.date().or(z.string())
});
export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      description: '',
      admin: '',
      date: ''
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
  }
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-700 text-[#747F93] text-[12px]">
                Responsáveis
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="cursor-pointer w-full rounded-[16px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="joão">João</SelectItem>
                  <SelectItem value="maria">Maria</SelectItem>
                  <SelectItem value="helena">Helena</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-700 text-[#747F93] text-[12px]">
                Data limite
              </FormLabel>
              <Popover>
                <PopoverTrigger className="w-fit">
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'cursor-pointer flex justify-self-start  w-[204px] rounded-[16px] text-left font-normal',
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
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
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
        >
          Adicionar tarefa
        </Button>
      </form>
    </Form>
  );
}
