import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { useCallback } from 'react';

interface Props {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  hide,
  isVisible,
  trigger,
  show
}) => {
  const handleOpenChange = useCallback(
    () => (isVisible ? show() : hide()),
    [hide, isVisible, show]
  );
  return (
    <Dialog open={isVisible} onOpenChange={handleOpenChange}>
      {trigger}
      <DialogContent className="max-w-[430px] max-h-[670px] top-[350px] rounded-[24px] w-full justify-self-center">
        <Button
          variant="secondary"
          className="absolute cursor-pointer top-[-48px] m-auto w-[40px] h-[40px] rounded-[50%] justify-self-center font-[20px]"
          onClick={hide}
        >
          <XIcon />
        </Button>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
