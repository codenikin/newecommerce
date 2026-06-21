import * as migration_20260616_043421 from './20260616_043421';
import * as migration_20260616_111826 from './20260616_111826';

export const migrations = [
  {
    up: migration_20260616_043421.up,
    down: migration_20260616_043421.down,
    name: '20260616_043421',
  },
  {
    up: migration_20260616_111826.up,
    down: migration_20260616_111826.down,
    name: '20260616_111826'
  },
];
