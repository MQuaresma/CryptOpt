/**
 * Copyright 2023 University of Adelaide
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ByteRegister, DwordRegister, Register, XmmRegister_64, XmmRegister } from "@/enums";

export function getByteRegFromQwReg(reg: Register): ByteRegister {
  const mapping: { [reg in Register]: ByteRegister } = {
    [Register.rax]: ByteRegister.al,
    [Register.rbx]: ByteRegister.bl,
    [Register.rcx]: ByteRegister.cl,
    [Register.rdx]: ByteRegister.dl,
    [Register.rdi]: ByteRegister.dil,
    [Register.rsi]: ByteRegister.sil,
    [Register.rsp]: ByteRegister.spl,
    [Register.rbp]: ByteRegister.bpl,
    [Register.r8]: ByteRegister.r8b,
    [Register.r9]: ByteRegister.r9b,
    [Register.r10]: ByteRegister.r10b,
    [Register.r11]: ByteRegister.r11b,
    [Register.r12]: ByteRegister.r12b,
    [Register.r13]: ByteRegister.r13b,
    [Register.r14]: ByteRegister.r14b,
    [Register.r15]: ByteRegister.r15b,
  };
  return mapping[reg];
}

export function getQwRegFromByteReg(reg: ByteRegister): Register {
  const mapping: { [reg in ByteRegister]: Register } = {
    [ByteRegister.al]: Register.rax,
    [ByteRegister.ah]: Register.rax,
    [ByteRegister.bl]: Register.rbx,
    [ByteRegister.bh]: Register.rbx,
    [ByteRegister.cl]: Register.rcx,
    [ByteRegister.ch]: Register.rcx,
    [ByteRegister.dl]: Register.rdx,
    [ByteRegister.dh]: Register.rdx,
    [ByteRegister.dil]: Register.rdi,
    [ByteRegister.sil]: Register.rsi,
    [ByteRegister.spl]: Register.rsp,
    [ByteRegister.sp]: Register.rsp,
    [ByteRegister.bpl]: Register.rbp,
    [ByteRegister.bp]: Register.rbp,
    [ByteRegister.r8b]: Register.r8,
    [ByteRegister.r9b]: Register.r9,
    [ByteRegister.r10b]: Register.r10,
    [ByteRegister.r11b]: Register.r11,
    [ByteRegister.r12b]: Register.r12,
    [ByteRegister.r13b]: Register.r13,
    [ByteRegister.r14b]: Register.r14,
    [ByteRegister.r15b]: Register.r15,
  };
  return mapping[reg];
}
export function getDwordRegFromQwReg(reg: Register): DwordRegister {
  const mapping: { [reg in Register]: DwordRegister } = {
    [Register.rax]: DwordRegister.eax,
    [Register.rbx]: DwordRegister.ebx,
    [Register.rcx]: DwordRegister.ecx,
    [Register.rdx]: DwordRegister.edx,
    [Register.rdi]: DwordRegister.edi,
    [Register.rsi]: DwordRegister.esi,
    [Register.rsp]: DwordRegister.esp,
    [Register.rbp]: DwordRegister.ebp,
    [Register.r8]: DwordRegister.r8d,
    [Register.r9]: DwordRegister.r9d,
    [Register.r10]: DwordRegister.r10d,
    [Register.r11]: DwordRegister.r11d,
    [Register.r12]: DwordRegister.r12d,
    [Register.r13]: DwordRegister.r13d,
    [Register.r14]: DwordRegister.r14d,
    [Register.r15]: DwordRegister.r15d,
  };
  return mapping[reg];
}

export function getQwHalfFromXmmReg(reg: XmmRegister_64): XmmRegister {
//  const mapping: { [reg in XmmRegister_64]: XmmRegister } = {
//    [XmmRegister_64.xmm0l] : XmmRegister.xmm0,   [XmmRegister_64.xmm0h] : XmmRegister.xmm0,
//    [XmmRegister_64.xmm1l] : XmmRegister.xmm1,   [XmmRegister_64.xmm1h] : XmmRegister.xmm1,
//    [XmmRegister_64.xmm2l] : XmmRegister.xmm2,   [XmmRegister_64.xmm2h] : XmmRegister.xmm2,
//    [XmmRegister_64.xmm3l] : XmmRegister.xmm3,   [XmmRegister_64.xmm3h] : XmmRegister.xmm3,
//    [XmmRegister_64.xmm4l] : XmmRegister.xmm4,   [XmmRegister_64.xmm4h] : XmmRegister.xmm4,
//    [XmmRegister_64.xmm5l] : XmmRegister.xmm5,   [XmmRegister_64.xmm5h] : XmmRegister.xmm5,
//    [XmmRegister_64.xmm6l] : XmmRegister.xmm6,   [XmmRegister_64.xmm6h] : XmmRegister.xmm6,
//    [XmmRegister_64.xmm7l] : XmmRegister.xmm7,   [XmmRegister_64.xmm7h] : XmmRegister.xmm7,
//    [XmmRegister_64.xmm8l] : XmmRegister.xmm8,   [XmmRegister_64.xmm8h] : XmmRegister.xmm8,
//    [XmmRegister_64.xmm9l] : XmmRegister.xmm9,   [XmmRegister_64.xmm9h] : XmmRegister.xmm9,
//    [XmmRegister_64.xmm10l] : XmmRegister.xmm10, [XmmRegister_64.xmm10h] : XmmRegister.xmm10,
//    [XmmRegister_64.xmm11l] : XmmRegister.xmm11, [XmmRegister_64.xmm11h] : XmmRegister.xmm11,
//    [XmmRegister_64.xmm12l] : XmmRegister.xmm12, [XmmRegister_64.xmm12h] : XmmRegister.xmm12,
//    [XmmRegister_64.xmm13l] : XmmRegister.xmm13, [XmmRegister_64.xmm13h] : XmmRegister.xmm13,
//    [XmmRegister_64.xmm14l] : XmmRegister.xmm14, [XmmRegister_64.xmm14h] : XmmRegister.xmm14,
//    [XmmRegister_64.xmm15l] : XmmRegister.xmm15, [XmmRegister_64.xmm15h] : XmmRegister.xmm15,
//  };
  //return mapping[reg];
  return reg as XmmRegister;
}
