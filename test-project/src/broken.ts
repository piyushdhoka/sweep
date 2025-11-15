

import express from 'express'; // This exists in node_modules
import { add } from './math'; // This exists

// Using add and express
const result = add(1, 2);
const app = express();
console.log(result, app);