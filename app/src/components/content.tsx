import { Bounce, ToastContainer } from 'react-toastify';
import { cn } from '@/lib/utils';

import Header from './header';
interface Props {
  children: React.ReactNode;
  className?: string;
}
const Content: React.FC<Props> = ({ children, className }) => {
  return (
    <section className="w-full h-full">
      <Header />
      <section
        className={cn(
          'min-h-[90vh] w-[90%] m-[auto] text-foreground pb-[60px]',
          className
        )}
      >
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          theme="light"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Bounce}
        />
      </section>
    </section>
  );
};

export default Content;
