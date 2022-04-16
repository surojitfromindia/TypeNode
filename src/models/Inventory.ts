/*
will be optional
while adding product
optinally add them inventory to track number of them
item will also hold inventory ids
a interventory can hold only one item
an item can have multiple inventory
*/

import { Model, Schema, model, Types, IndexDefinition, } from 'mongoose';
import { unqiueNumber } from './Static';
import { IInventory } from '../Interface/IProducts';

const InventorySchema: Schema = new Schema<IInventory>({
  uid: { type: 'String' },
  inventory_name: { type: 'String', required: true },
  inventory_description: { type: 'String', required: false },
  main_branch: { type: Types.ObjectId, required: true, },
  capacity: { type: 'Number', required: true, default: 1 },
  status: { type: 'String', enum: ['active', 'inactive'], default: 'active' },
});

const index:IndexDefinition = {
    "main_branch": 1,
    "inventory_name": 1,
}


//unique 'main_branch' and 'inventory_name'
InventorySchema.index(index,{unique:true});

InventorySchema.pre('save', function (this: IInventory, next) {
  this.uid = unqiueNumber().toString();
  next();
});

const InventoryModel: Model<IInventory> = model('Inventory', InventorySchema);

export { InventoryModel };