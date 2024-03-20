import { Register, MmxRegister, XmmRegister, XmmRegister_64 } from "@/enums";
// that Array contains the order of the arguments, which are passed to the method
export const CALLING_CONVENTION_REGISTER_ORDER = [
  Register.rdi, // First argument goes here
  Register.rsi, // second here
  Register.rdx, // well, you guessed it, third is in here
  Register.rcx, // four
  Register.r8, // five
  Register.r9, // sixth there.
  // next are on the stack but we are not bothering with that now.
];

//whereas this ones are the values of those need to be preserved
export const CALLER_SAVE_REGISTERS = [
  Register.rbx,
  Register.rbp,
  Register.r12,
  Register.r13,
  Register.r14,
  Register.r15,
];

export const ALL_MMX_REGISTERS = [
  MmxRegister.mm0,
  MmxRegister.mm1,
  MmxRegister.mm2,
  MmxRegister.mm3,
  MmxRegister.mm4,
  MmxRegister.mm5,
  MmxRegister.mm6,
  MmxRegister.mm7,
];

export const ALL_XMM_REGISTERS = [
  XmmRegister.xmm0,
  XmmRegister.xmm1,
  XmmRegister.xmm2,
  XmmRegister.xmm3,
  XmmRegister.xmm4,
  XmmRegister.xmm5,
  XmmRegister.xmm6,
  XmmRegister.xmm7,
  XmmRegister.xmm8,
  XmmRegister.xmm9,
  XmmRegister.xmm10,
  XmmRegister.xmm11,
  XmmRegister.xmm12,
  XmmRegister.xmm13,
  XmmRegister.xmm14,
  XmmRegister.xmm15,
];

export const ALL_XMM_REGISTERS_64 = [
  XmmRegister_64.xmm0,
  XmmRegister_64.xmm1,
  XmmRegister_64.xmm2,
  XmmRegister_64.xmm3,
  XmmRegister_64.xmm4,
  XmmRegister_64.xmm5,
  XmmRegister_64.xmm6,
  XmmRegister_64.xmm7,
  XmmRegister_64.xmm8,
  XmmRegister_64.xmm9,
  XmmRegister_64.xmm10,
  XmmRegister_64.xmm11,
  XmmRegister_64.xmm12,
  XmmRegister_64.xmm13,
  XmmRegister_64.xmm14,
  XmmRegister_64.xmm15,
];



//export const ALL_XMM_REGISTERS_64 = [
//  XmmRegister_64.xmm0l,  XmmRegister_64.xmm0h,
//  XmmRegister_64.xmm1l,  XmmRegister_64.xmm1h,
//  XmmRegister_64.xmm2l,  XmmRegister_64.xmm2h,
//  XmmRegister_64.xmm3l,  XmmRegister_64.xmm3h,
//  XmmRegister_64.xmm4l,  XmmRegister_64.xmm4h,
//  XmmRegister_64.xmm5l,  XmmRegister_64.xmm5h,
//  XmmRegister_64.xmm6l,  XmmRegister_64.xmm6h,
//  XmmRegister_64.xmm7l,  XmmRegister_64.xmm7h,
//  XmmRegister_64.xmm8l,  XmmRegister_64.xmm8h,
//  XmmRegister_64.xmm9l,  XmmRegister_64.xmm9h,
//  XmmRegister_64.xmm10l, XmmRegister_64.xmm10h,
//  XmmRegister_64.xmm11l, XmmRegister_64.xmm11h,
//  XmmRegister_64.xmm12l, XmmRegister_64.xmm12h,
//  XmmRegister_64.xmm13l, XmmRegister_64.xmm13h,
//  XmmRegister_64.xmm14l, XmmRegister_64.xmm14h,
//  XmmRegister_64.xmm15l, XmmRegister_64.xmm15h,
//];
