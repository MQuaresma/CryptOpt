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

/**
 * This is a simple (yet long) mapper file.
 * It provides collection the functions of the form OUT__ARG0_ARG1_ARG2:
 *  - fr__rm_rm
 *  - r__rm_rm_rmf
 *  - fr__rm_rm_rmf
 *  - r__rmf_rmf
 * where r stands for register, m for memory, f for flag.
 *
 * They will then analyse the arguments and call the respective implementation function
 *
 * All of them will emit the necessary asm-instructions, to add the arguments together.
 * They will also take care of the allocation and new allocation of the results. (name of out-flag and out-reg)
 */

import { isByteRegister, isFlag, isMem, isNotNoU, isRegister, isMmxRegister, isXmmRegister_64, isXmmRegister } from "@/helper";
import { RegisterAllocator } from "@/registerAllocator";
import type {
  asm,
  MemoryAllocation,
  RegisterAllocation,
  XmmRegisterAllocation,
  U1Allocation,
  U1FlagAllocation,
  U1MemoryAllocation,
  U1RegisterAllocation,
  U64Allocation,
  U64RegisterAllocation,
  ValueAllocation,
  MmxRegisterAllocation,
} from "@/types";

import { fr__m_m, fr__r_m, fr__r_r } from "./fr__rm_rm";
import {
  fr__m_m_f,
  fr__m_m_m,
  fr__m_m_r,
  fr__r_m_f,
  fr__r_m_m,
  fr__r_m_r,
  fr__r_r_f,
  fr__r_r_m,
  fr__r_r_r,
} from "./fr__rm_rm_rmf";
import {
  r__m_m_f,
  r__m_m_m,
  r__m_m_r,
  r__r_m_f,
  r__r_m_m,
  r__r_m_r,
  r__r_r_f,
  r__r_r_m,
  r__r_r_r,
} from "./r__rm_rm_rmf";
import {
  v__v_v,
  v__v_m,
  mx__mx_mx,
  mx__mx_m,
} from "./v__v_vm";
import { r__f_f, r__m_f, r__m_m, r__r_f, r__r_m, r__r_r } from "./r__rmf_rmf";

export function fr__rm_rm(cout: string, out: string, arg0: ValueAllocation, arg1: ValueAllocation): asm[] {
  if (isFlag(arg0.store) || isFlag(arg1.store)) {
    // what?
    throw new Error("flags are not supported here in fr__rm_rm.TSNH");
  }
  const mem0 = isMem(arg0.store);
  const mem1 = isMem(arg1.store);
  if (!mem0 && !mem1) {
    return fr__r_r(cout, out, arg0 as RegisterAllocation, arg1 as RegisterAllocation);
  }
  if (!mem0 && mem1) {
    return fr__r_m(cout, out, arg0 as RegisterAllocation, arg1 as MemoryAllocation);
  }
  if (mem0 && !mem1) {
    return fr__r_m(cout, out, arg1 as RegisterAllocation, arg0 as MemoryAllocation);
  }
  if (mem0 && mem1) {
    return fr__m_m(cout, out, arg0 as MemoryAllocation, arg1 as MemoryAllocation);
  }
  throw new Error("arguments are not rr / rm / mm. Abort");
}

export function r__rm_rm_rmf(
  out: string,
  arg0: U64Allocation,
  arg1: MemoryAllocation | RegisterAllocation,
  cin: U1Allocation,
): asm[] {
  return fr__rm_rm_rmf(null, out, arg0, arg1, cin);
}

export function fr__rm_rm_rmf(
  cout: string | undefined | null,
  out: string,
  arg0: U64Allocation,
  arg1: U64Allocation | U1Allocation,
  cin: U1Allocation,
): asm[] {
  if (isByteRegister(arg0.store)) {
    throw new Error(
      "not supported. TSNH. either put u1 as arg1 or carry in. if they alreaady are, then implement u1+u1+u1",
    );
  }
  const hasCout = isNotNoU(cout);
  const reg0 = isRegister(arg0.store);
  const reg1 = isRegister(arg1.store) || isByteRegister(arg1.store);

  const cinFlag = isFlag(cin.store);
  const cinMem = isMem(cin.store);
  const cinXmm = isXmmRegister(cin.store);
  const cinMmx = isMmxRegister(cin.store); //maybe we can optimize this, since it can only be either in Xmm or Mmx or Memory

  // a bit of a hack... lets see how long it takes until this breaks my neck and I need to implement it properly
  // the issue is that the flag has been spilled to a byteReg, which has then been spilled to a reg, then to xmm
  // it still only contains a single bit of information.
  // to read it again, we need to movq it to an reg, then use it as an u1 (i.e. load flag with add to -1)
  if (cinXmm) {
    cin = RegisterAllocator.xmm2reg(cin) as U1RegisterAllocation;
  } else if (cinMmx) {
    cin = RegisterAllocator.mmx2reg(cin) as U1RegisterAllocation;
  }

  const cinReg = isRegister(cin.store) || isByteRegister(cin.store);

  //  R + R + RMR
  if (reg0 && reg1) {
    const a0 = arg0 as U64RegisterAllocation;
    const a1 = arg1 as RegisterAllocation;
    if (cinFlag) {
      return hasCout
        ? [
            `;why? ${cin.store} ain't a flag, right?`,
            ...fr__r_r_f(cout, out, a0, a1, cin as U1FlagAllocation),
          ]
        : r__r_r_f(out, a0, a1, cin as U1FlagAllocation);
    }
    if (cinMem) {
      return hasCout
        ? fr__r_r_m(cout, out, a0, a1, cin as U1MemoryAllocation)
        : r__r_r_m(out, a0, a1, cin as U1MemoryAllocation);
    }

    if (cinReg) {
      return hasCout
        ? fr__r_r_r(cout, out, a0, a1, cin as U1RegisterAllocation)
        : r__r_r_r(out, a0, a1, cin as U1RegisterAllocation);
    }
    throw new Error("cannot handle cin not in mem/flag/reg");
  }

  //  for the case one arg is in mem, the other one in reg
  //  R + M + RMR
  if (reg0 !== reg1) {
    let a0: U64RegisterAllocation;
    let a1: MemoryAllocation;
    if (reg0 && !reg1) {
      a0 = arg0 as U64RegisterAllocation;
      a1 = arg1 as MemoryAllocation;
    } /*(!reg0 && reg1)*/ else {
      // note the flip
      a0 = arg1 as U64RegisterAllocation;
      a1 = arg0 as MemoryAllocation;
    }

    if (cinFlag) {
      return hasCout
        ? fr__r_m_f(cout, out, a0, a1, cin as U1FlagAllocation)
        : r__r_m_f(out, a0, a1, cin as U1FlagAllocation);
    }
    if (cinMem) {
      return hasCout
        ? fr__r_m_m(cout, out, a0, a1, cin as U1MemoryAllocation)
        : r__r_m_m(out, a0, a1, cin as U1MemoryAllocation);
    }
    if (cinReg) {
      return hasCout
        ? fr__r_m_r(cout, out, a0, a1, cin as U1RegisterAllocation)
        : r__r_m_r(out, a0, a1, cin as U1RegisterAllocation);
    }
    throw new Error("cannot handle cin not in mem/flag/reg");
  }

  //  M + R + RMR (  //  M + M + RMR
  if (!reg0 && !reg1) {
    const a0 = arg0 as MemoryAllocation;
    const a1 = arg1 as MemoryAllocation;
    if (cinFlag) {
      return hasCout
        ? fr__m_m_f(cout, out, a0, a1, cin as U1FlagAllocation)
        : r__m_m_f(out, a0, a1, cin as U1FlagAllocation);
    }
    if (cinMem) {
      return hasCout
        ? fr__m_m_m(cout, out, a0, a1, cin as U1MemoryAllocation)
        : r__m_m_m(out, a0, a1, cin as U1MemoryAllocation);
    }
    if (cinReg) {
      return hasCout
        ? fr__m_m_r(cout, out, a0, a1, cin as U1RegisterAllocation)
        : r__m_m_r(out, a0, a1, cin as U1RegisterAllocation);
    }
    throw new Error("cannot handle cin not in mem/flag/reg");
  }
  throw new Error("arguments are not rrf / rmf / mmf / rrr / rmr / mmr / rrm / rmm / mmm. Abort");
}

export function r__rmf_rmf(out: string, arg0: ValueAllocation, arg1: ValueAllocation): asm[] {
  const flag0 = isFlag(arg0.store);
  const mem0 = isMem(arg0.store);
  const mmx0 = isMmxRegister(arg0.store);
  const xmm0 = isXmmRegister(arg0.store);
  let reg0 = !flag0 && !mem0 && !mmx0 && !xmm0;

  const flag1 = isFlag(arg1.store);
  const mem1 = isMem(arg1.store);
  const mmx1 = isMmxRegister(arg1.store);
  const xmm1 = isXmmRegister(arg1.store);
  let reg1 = !flag1 && !mem1 && !mmx1 && !xmm1;

  if (xmm0) {
    arg0 = RegisterAllocator.xmm2reg(arg0);
    reg0 = true;
  } else if (mmx0) {
    arg0 = RegisterAllocator.mmx2reg(arg0);
    reg0 = true;
  }

  if (xmm1) {
    arg1 = RegisterAllocator.xmm2reg(arg1);
    reg1 = true;
  } else if (mmx1) {
    arg1 = RegisterAllocator.mmx2reg(arg1);
    reg1 = true;
  }

  /**
   *
   * ff
   * mm
   * rr
   *
   * mf
   *
   * rm
   *
   * rf
   *
   */
  if (flag0 && flag1) {
    // ff
    return r__f_f(out);
  }
  if (mem0 && mem1) {
    //mm
    return r__m_m(out, arg0 as MemoryAllocation, arg1 as MemoryAllocation);
  }
  if (reg0 && reg1) {
    //rr
    return r__r_r(out, arg0 as RegisterAllocation, arg1 as RegisterAllocation);
  }

  if (mem0 && flag1) {
    // mf
    return r__m_f(out, arg0 as MemoryAllocation, arg1 as U1FlagAllocation);
  }
  if (flag0 && mem1) {
    // fm-mf NOTE the argument swap
    return r__m_f(out, arg1 as MemoryAllocation, arg0 as U1FlagAllocation);
  }

  if (reg0 && mem1) {
    // rm
    return r__r_m(out, arg0 as RegisterAllocation, arg1 as MemoryAllocation);
  }
  if (mem0 && reg1) {
    // mr NOTE the argument swap
    return r__r_m(out, arg1 as RegisterAllocation, arg0 as MemoryAllocation);
  }

  if (reg0 && flag1) {
    // rf
    return r__r_f(out, arg0 as RegisterAllocation, arg1 as U1FlagAllocation);
  }
  if (flag0 && reg1) {
    // fr NOTE the argument swap
    return r__r_f(out, arg1 as RegisterAllocation, arg0 as U1FlagAllocation);
  }

    throw new Error("arguments are not  rr / rm / rf / mm / mf / ff. Abort");
}

export function v__vm_vm(out: string, arg0: ValueAllocation, arg1: ValueAllocation): asm[] {
  /**
   * If the args are in incompatible types (e.g. scalar & vector OR flag & vector)
   * we need to move one of them to a register of the same type.
   * In this case : vector -> scalar
   * rr
   */
  let xmm0 = isXmmRegister(arg0.store);
  let mmx0 = isMmxRegister(arg0.store);
  let mem0 = isMem(arg0.store);
  let reg0 = !mem0 && !mmx0 && !xmm0;

  let xmm1 = isXmmRegister(arg1.store);
  let mmx1 = isMmxRegister(arg1.store);
  let mem1 = isMem(arg1.store);
  let reg1 = !mem1 && !mmx1 && !xmm1;

  if (xmm0 && (mmx1 || reg1)) {
    arg1 = RegisterAllocator.reg2xmm(arg1);
    xmm1 = true;
    mmx1 = false;
    reg1 = false;
  } else if ((mmx0 || reg0) && xmm1) {
    arg0 = RegisterAllocator.reg2xmm(arg0);
    xmm0 = true;
    mmx0 = false;
    reg0 = false;
  } else if (mmx0 && reg1) {
    arg1 = RegisterAllocator.reg2mmx(arg1);
    xmm1 = false;
    mmx1 = true;
    reg1 = false;
  } else if (reg0 && mmx1) {
    arg0 = RegisterAllocator.reg2mmx(arg0);
    xmm0 = false;
    mmx0 = true;
    reg0 = false;
  }

  if (xmm0 && xmm1) {
    return v__v_v(out, arg0 as XmmRegisterAllocation, arg1 as XmmRegisterAllocation);
  } 
  if (xmm0 && mem1) {
    return v__v_m(out, arg0 as XmmRegisterAllocation, arg1 as MemoryAllocation);
  } 
  if (mem0 && xmm1) {
    return v__v_m(out, arg1 as XmmRegisterAllocation, arg0 as MemoryAllocation);
  }
  if (mmx0 && mmx1) {
    return mx__mx_mx(out, arg0 as MmxRegisterAllocation, arg1 as MmxRegisterAllocation);
  }
  if (mmx0 && mem1) {
    return mx__mx_m(out, arg0 as MmxRegisterAllocation, arg1 as MemoryAllocation);
  }
  if (mem0 && mmx1) {
    return mx__mx_m(out, arg1 as MmxRegisterAllocation, arg0 as MemoryAllocation);
  }

  throw new Error("arguments are not vv, vm, mv. Abort");
}
