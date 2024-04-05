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

import { Flags, FlagState, XmmRegister, MmxRegister } from "@/enums";
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
  MmxRegisterAllocation,
  XmmRegisterAllocation,
  U64XmmRegisterAllocation,
  U64MemoryAllocation,
  U64MmxRegisterAllocation,
} from "@/types";

const getRa = () => RegisterAllocator.getInstance();

export function mx__mx_mx(out: string, r0: MmxRegisterAllocation, r1: MmxRegisterAllocation): asm[] {
  return mx__mx64_mx64(out, r0 as U64MmxRegisterAllocation, r1 as U64MmxRegisterAllocation);
}

function mx__mx64_mx64(out: string, r0: U64MmxRegisterAllocation, r1: U64MmxRegisterAllocation): asm[] {
  const ra = getRa(); 
  const r0store = ra.backupIfStoreHasDependencies(r0, out) as MmxRegister;

  return [`paddq ${r0store}, ${r1.store}; mx__mx64_mx64`];
}

export function mx__mx_m(out: string, r0: MmxRegisterAllocation, r1: MemoryAllocation): asm[] {
  return mx__mx64_m64(out, r0 as U64MmxRegisterAllocation, r1 as U64MemoryAllocation);
}

function mx__mx64_m64(out: string, r0: U64MmxRegisterAllocation, r1: U64MemoryAllocation): asm[] {
  const ra = getRa();
  const r0store = ra.backupIfStoreHasDependencies(r0, out) as MmxRegister;

  return [`paddq ${r0store}, ${r1.store}; mx__mx64_m64`];
}

export function v__v_v(out: string, r0: XmmRegisterAllocation, r1: XmmRegisterAllocation): asm[] {
  return v__v128_v128(out, r0 as U64XmmRegisterAllocation, r1 as U64XmmRegisterAllocation);
  // throw new Error("TSNH. Must be r128+r128.");
}

function v__v128_v128(out: string, r0: U64XmmRegisterAllocation, r1: U64XmmRegisterAllocation): asm[] {
  const ra = getRa();
  const r0store = ra.backupIfStoreHasDependencies(r0, out) as XmmRegister;

  return [`paddq ${r0store}, ${r1.store}; v__v128_v128`];
}

export function v__v_m(out: string, r0: XmmRegisterAllocation, m1: MemoryAllocation): asm[] {
  return v__v128_m128(out, r0 as U64XmmRegisterAllocation, m1 as U64MemoryAllocation);
}

function v__v128_m128(out: string, r0: U64XmmRegisterAllocation, m1: U64MemoryAllocation): asm[] {
  const ra = getRa();
  const r0store = ra.backupIfStoreHasDependencies(r0, out) as XmmRegister;

  return [`paddq ${r0store}, ${m1.store}; v__v128_m128`];
}

