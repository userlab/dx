import { DxArgs } from '../types'
import { create } from './create'
import { update } from './update'

export const createModel = <TObject, TCreateObject>(config: DxArgs) => ({
  create: create<TObject, TCreateObject>(config),
  update: update<TObject>(config),
})
