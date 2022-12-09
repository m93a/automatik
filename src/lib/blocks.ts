import type { ActionBlockDefinition, ValueBlockDefinition } from './types';

export const ON_START = 'com.github.m93a.automatik.onStart';
export const onStart: ActionBlockDefinition = {
  uuid: ON_START,
  type: 'action',
  isHat: true,
  connections: [],

  defaultLocalization: {
    parts: [{ type: 'text', content: 'On the start of this action' }]
  }
};

export const IF = 'com.github.m93a.automatik.if';
export const if_: ActionBlockDefinition = {
  uuid: IF,
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

export const IF_ELSE = 'com.github.m93a.automatik.ifElse';
export const ifElse: ActionBlockDefinition = {
  uuid: IF_ELSE,
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

export const SEND_MAIL = 'com.github.m93a.automatik.sendMail';
export const sendMail: ActionBlockDefinition = {
  uuid: SEND_MAIL,
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

export const CUSTOMER_NAME = 'com.github.m93a.automatik.customerName';
export const customerName: ValueBlockDefinition = {
  uuid: CUSTOMER_NAME,
  type: 'value',

  defaultLocalization: {
    parts: [{ type: 'text', content: 'Customer Name' }]
  }
};

export const CUSTOMER_EMAIL = 'com.github.m93a.automatik.customerEmail';
export const customerEmail: ValueBlockDefinition = {
  uuid: CUSTOMER_EMAIL,
  type: 'value',

  defaultLocalization: {
    parts: [{ type: 'text', content: 'Customer E-mail' }]
  }
};
