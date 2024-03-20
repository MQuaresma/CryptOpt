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

import { Flags, FlagState } from "@/enums";
import { ADX, isByteRegister, isU1, zx } from "@/helper";
import { Model } from "@/model";
import { RegisterAllocator } from "@/registerAllocator";
import type {
  asm,
  MemoryAllocation,
  RegisterAllocation,
  U1FlagAllocation,
  U1RegisterAllocation,
  U64RegisterAllocation,
  XmmRegisterAllocation,
} from "@/types";

const getRa = () => RegisterAllocator.getInstance();

//export function mx__mx_mxm(out: string, r0: RegisterAllocation, r1: RegisterAllocation): asm[] {
//  
//}
//
//function m64__m64_m64(out: string, r0: U64RegisterAllocation, r1: U64RegisterAllocation): asm[] {
//}

export function v__v_v(out: string, r0: RegisterAllocation, r1: RegisterAllocation): asm[] {
  return v__v128_v128(out, r0 as U64RegisterAllocation, r1 as U64RegisterAllocation);
  // throw new Error("TSNH. Must be r128+r128.");
}

// reg = reg(128) + reg (128)
function v__v128_v128(out: string, r0: U64RegisterAllocation, r1: U64RegisterAllocation): asm[] {
  const ra = getRa();
  const r0store = ra.backupIfStoreHasDependencies(r0, out);

  return [`paddq ${r0store}, ${r1.store}; v__v128_v128`];

  throw new Error("TSNH Must be r128 + r128");
}

export function v__v_m(out: string, r0: RegisterAllocation, m1: MemoryAllocation): asm[] {
  return v__v128_m128(out, r0, m1);
}

function v__v128_m128(out: string, r0: RegisterAllocation | MemoryAllocation, m1: MemoryAllocation): asm[] {
  const ra = getRa();
  const r0store = ra.backupIfStoreHasDependencies(r0, out);

  return [`paddq ${r0store}, ${m1.store}; v__v128_m128`];

  throw new Error("TSNH Must be r128 + m128");
}

