import logo from '@/assets/logo.svg';
import React from 'react';
import { Label } from './ui/label';

const Header: React.FC = () => {
  return (
    <header className="flex max-w-[1220px] w-[90%] h-[87px] mt-[40px] m-auto bg-popover gap-[24px] p-[16px] text-foreground items-center border border-border rounded-[24px]">
      <div className="flex gap-4 items-center">
        <img src={logo} alt="logo" className="w-[56px] sm:w-16" />
      </div>
      <Label className="text-primary font-bold font-[14px]">
        Teste vaga front
      </Label>
    </header>
  );
};

export default Header;
