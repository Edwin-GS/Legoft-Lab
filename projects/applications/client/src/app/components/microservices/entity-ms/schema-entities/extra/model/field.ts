export interface Field {
  id: number;
  isSelected: boolean;
  name: string;
  type: string;
  required: boolean;
  update: boolean;
  unique: boolean;
  size: object;
  enum: Array<string>;
  object: object;
  objectId: string;
  isEdit: boolean;
}

export const FieldColumns = [
  { key: 'isSelected', type: 'isSelected', label: '' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'type', label: 'Type', type: 'select', required: true },
  { key: 'required', label: 'Required', type: 'boolean', required: true },
  { key: 'update', label: 'Update', type: 'boolean', required: true },
  { key: 'unique', label: 'Unique', type: 'boolean', required: true },
  { key: 'size', label: 'Size', type: 'object', required: false },
  { key: 'enum', label: 'Enum', type: 'enum', required: false },
  { key: 'object', label: 'Object', type: 'object', required: false },
  { key: 'objectId', label: 'ObjectId', type: 'objectId', required: false },
  { key: 'isEdit', type: 'isEdit' },
];
