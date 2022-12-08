interface CommonBlockDefinition {
  /**
   * A universally unique identifier of the block. It should be in
   * the format `tld.domain.blockName`, or `tld.domain.subdomain.project.blockName`.
   * For example:
   * ```
   * com.github.m93a.automatik.if
   * edu.mit.scratch.setVariable
   * dev.bloky.add
   * ```
   */
  uuid: string;

  /**
   * Whether the connection expects an action (ie. code to be executed)
   * or a value. This will be replaced by a sound type system in the
   * future.
   */
  type: 'action' | 'value';

  /**
   * The default localization of this block, typically in English.
   * Used as a fallback when the proper localization is not found.
   */
  defaultLocalization: Omit<BlockLocalization, 'uuid'>;
}

export interface ValueBlockDefinition extends CommonBlockDefinition {
  type: 'value';
}

export interface ActionBlockDefinition extends CommonBlockDefinition {
  type: 'action';

  /**
   * If a block is a hat block, it is not possible
   * to connect it after any other block (ie. an event)
   */
  isHat?: boolean;

  /**
   * If a block is a cap block, it is not possible
   * to connect any other block after it (ie. an exception)
   */
  isCap?: boolean;

  connections: ConnectionDefinition[];
}

export interface ConnectionDefinition {
  /**
   * Name of the connection, unique per block.
   */
  name: string;

  /**
   * Whether the connection expects an action (ie. code to be executed)
   * or a value. This will be replaced by a sound type system in the
   * future.
   */
  type: 'action' | 'value';
}

export type BlockDefinition = ActionBlockDefinition | ValueBlockDefinition;

export interface BlockLocalization {
  /** UUID of the block to be localized */
  uuid: string;
  parts: BlockLocalizationPart[];
}

export type BlockLocalizationPart =
  | { type: 'text'; content: string }
  | { type: 'icon'; content: any }
  | { type: 'connection'; name: string; defaultValue?: string }
  | { type: 'line-break' };

export interface BlockInstance {
  /** UUID of the block */
  prototype: string;
  
  connections: Record<string, BlockInstance | BlockStack>;
}

export type BlockStack = BlockInstance[];
