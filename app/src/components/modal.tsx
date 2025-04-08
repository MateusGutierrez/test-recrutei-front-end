import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { ProfileForm } from './form';
import useIsVisible from '@/hooks/useIsVisible';

const Modal: React.FC = () => {
  const { isVisible, hide, show } = useIsVisible();
  return (
    <Dialog open={isVisible} onOpenChange={hide}>
      <div className="text-center mb-4 bg-white w-[162px] h-[72px] rounded-b-[16px] flex items-center justify-center m-auto">
        <Button
          className="h-[40px] rounded-[32px] font-bold cursor-pointer"
          onClick={() => show()}
        >
          Adicionar Tarefa
        </Button>
      </div>

      <DialogContent className="max-w-[430px] max-h-[670px] top-[350px] rounded-[24px] w-full justify-self-center">
        <Button
          variant="secondary"
          className="absolute cursor-pointer top-[-48px] m-auto w-[40px] h-[40px] rounded-[50%] justify-self-center font-[20px]"
          onClick={hide}
        >
          <XIcon />
        </Button>
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da nova tarefa
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
