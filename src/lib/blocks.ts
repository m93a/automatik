import type { ActionBlockDefinition, ValueBlockDefinition } from './types';

export const onStart: ActionBlockDefinition = {
  uuid: 'com.github.m93a.automatik.onStart',
  type: 'action',
  isHat: true,
  connections: [],

  defaultLocalization: {
    parts: [{ type: 'text', content: 'On the start of this action' }]
  }
};

export const if_: ActionBlockDefinition = {
  uuid: 'com.github.m93a.automatik.if',
  type: 'action',
  connections: [
    { name: 'condition', type: 'value' },
    { name: 'then', type: 'action' }
  ],

  defaultLocalization: {
    parts: [
      { type: 'text', content: 'If' },
      { type: 'connection', name: 'condition' },
      { type: 'line-break' },
      { type: 'connection', name: 'then' }
    ]
  }
};

export const ifElse: ActionBlockDefinition = {
  uuid: 'com.github.m93a.automatik.ifElse',
  type: 'action',
  connections: [
    { name: 'condition', type: 'value' },
    { name: 'then', type: 'action' },
    { name: 'else', type: 'action' }
  ],

  defaultLocalization: {
    parts: [
      { type: 'text', content: 'If' },
      { type: 'connection', name: 'condition' },
      { type: 'line-break' },
      { type: 'connection', name: 'then' },
      { type: 'line-break' },
      { type: 'text', content: 'Else' },
      { type: 'line-break' },
      { type: 'connection', name: 'else' }
    ]
  }
};

export const sendMail: ActionBlockDefinition = {
  uuid: 'com.github.m93a.automatik.sendMail',
  type: 'action',
  connections: [
    { name: 'subject', type: 'value' },
    { name: 'address', type: 'value' },
    { name: 'message', type: 'value' }
  ],

  defaultLocalization: {
    parts: [
      { type: 'text', content: 'Send e-mail titled' },
      { type: 'connection', name: 'subject', defaultValue: 'Subject' },
      { type: 'text', content: 'to' },
      { type: 'connection', name: 'address', defaultValue: 'john.doe@example.com' },
      { type: 'text', content: 'with the text:' },
      { type: 'line-break' },
      { type: 'connection', name: 'message' }
    ]
  }
};

export const customerName: ValueBlockDefinition = {
  uuid: 'com.github.m93a.automatik.customerName',
  type: 'value',

  defaultLocalization: {
    parts: [{ type: 'text', content: 'Customer Name' }]
  }
};

export const customerEmail: ValueBlockDefinition = {
  uuid: 'com.github.m93a.automatik.customerEmail',
  type: 'value',

  defaultLocalization: {
    parts: [{ type: 'text', content: 'Customer E-mail' }]
  }
};
