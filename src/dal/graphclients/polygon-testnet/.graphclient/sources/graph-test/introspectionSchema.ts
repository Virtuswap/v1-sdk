// @ts-nocheck
import { buildASTSchema } from 'graphql';

const schemaAST = {
    kind: 'Document',
    definitions: [
        {
            kind: 'SchemaDefinition',
            operationTypes: [
                {
                    kind: 'OperationTypeDefinition',
                    operation: 'query',
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Query',
                        },
                    },
                },
                {
                    kind: 'OperationTypeDefinition',
                    operation: 'subscription',
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Subscription',
                        },
                    },
                },
            ],
            directives: [],
        },
        {
            kind: 'DirectiveDefinition',
            description: {
                kind: 'StringValue',
                value: 'Marks the GraphQL type as indexable entity.  Each type that should be an entity is required to be annotated with this directive.',
            },
            name: {
                kind: 'Name',
                value: 'entity',
            },
            arguments: [],
            repeatable: false,
            locations: [
                {
                    kind: 'Name',
                    value: 'OBJECT',
                },
            ],
        },
        {
            kind: 'DirectiveDefinition',
            description: {
                kind: 'StringValue',
                value: 'Defined a Subgraph ID for an object type',
            },
            name: {
                kind: 'Name',
                value: 'subgraphId',
            },
            arguments: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'String',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            repeatable: false,
            locations: [
                {
                    kind: 'Name',
                    value: 'OBJECT',
                },
            ],
        },
        {
            kind: 'DirectiveDefinition',
            description: {
                kind: 'StringValue',
                value: 'creates a virtual field on the entity that may be queried but cannot be set manually through the mappings API.',
            },
            name: {
                kind: 'Name',
                value: 'derivedFrom',
            },
            arguments: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'field',
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'String',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            repeatable: false,
            locations: [
                {
                    kind: 'Name',
                    value: 'FIELD_DEFINITION',
                },
            ],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Aggregation_interval',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'hour',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'day',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ScalarTypeDefinition',
            name: {
                kind: 'Name',
                value: 'BigDecimal',
            },
            directives: [],
        },
        {
            kind: 'ScalarTypeDefinition',
            name: {
                kind: 'Name',
                value: 'BigInt',
            },
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'BlockChangedFilter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'number_gte',
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Int',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Block_height',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'hash',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Bytes',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'number',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Int',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'number_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Int',
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ScalarTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Bytes',
            },
            directives: [],
        },
        {
            kind: 'ScalarTypeDefinition',
            description: {
                kind: 'StringValue',
                value: '8 bytes signed integer\n',
                block: true,
            },
            name: {
                kind: 'Name',
                value: 'Int8',
            },
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'LiquidityPosition',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'User',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Pair',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'LiquidityPosition_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'User_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Pair_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'LiquidityPosition_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'LiquidityPosition_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'LiquidityPosition_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user__vrswLockedPositionsNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance0',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance1',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__fee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__vFee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__maxReserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__reserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalSupply',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__blocksDelay',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalMu',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalStaked',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapBlock',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__allocationPoints',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token0Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token1Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtBlockNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityTokenBalance',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'LpStakingPosition',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'User',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Pair',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'LpStakingPosition_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'User_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Pair_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'LpStakingPosition_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'LpStakingPosition_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'LpStakingPosition_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user__vrswLockedPositionsNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance0',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance1',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__fee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__vFee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__maxReserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__reserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalSupply',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__blocksDelay',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalMu',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalStaked',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapBlock',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__allocationPoints',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token0Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token1Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtBlockNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            description: {
                kind: 'StringValue',
                value: 'Defines the order direction, either ascending or descending',
                block: true,
            },
            name: {
                kind: 'Name',
                value: 'OrderDirection',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'asc',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'desc',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Pair',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Token',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Token',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'whitelist',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairWhitelist_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairWhitelist_filter',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'PairWhitelist',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserves',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairReserve_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairReserve_filter',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'PairReserve',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'PairReserve',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Pair',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Token',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'PairReserve_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Pair_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Token_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'PairReserve_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'PairReserve_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'PairReserve_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance0',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance1',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__fee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__vFee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__maxReserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__reserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalSupply',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__blocksDelay',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalMu',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalStaked',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapBlock',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__allocationPoints',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token0Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token1Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtBlockNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__symbol',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__name',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__decimals',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'baseValue',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'PairWhitelist',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Token',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Pair',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'PairWhitelist_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Token_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Pair_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'PairWhitelist_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'PairWhitelist_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'PairWhitelist_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__symbol',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__name',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token__decimals',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance0',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__balance1',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__fee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__vFee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__maxReserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__reserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalSupply',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__blocksDelay',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalMu',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__totalStaked',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapBlock',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__lastSwapTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__allocationPoints',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token0Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__token1Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair__createdAtBlockNumber',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Pair_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Token_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Token_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'whitelist_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'PairWhitelist_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserves_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'PairReserve_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Pair_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Pair_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Pair_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0__symbol',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0__name',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0__decimals',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1__symbol',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1__name',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1__decimals',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance0',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'balance1',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'fee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vFee',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'maxReserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'reserveRatio',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalSupply',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'blocksDelay',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalMu',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'totalStaked',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapBlock',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lastSwapTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'whitelist',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'allocationPoints',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token0Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token1Price',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserves',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtTimestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'createdAtBlockNumber',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Query',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Token',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'tokens',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Token_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Token_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'Token',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Pair',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairs',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Pair_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Pair_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'Pair',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'User',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'users',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'User_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'User_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'User',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPosition',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'LiquidityPosition',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'LiquidityPosition',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairWhitelist',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'PairWhitelist',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairWhitelists',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairWhitelist_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairWhitelist_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'PairWhitelist',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserve',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'PairReserve',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserves',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairReserve_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairReserve_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'PairReserve',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'tokenomicsParams',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'TokenomicsParams',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'tokenomicsParams_collection',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'TokenomicsParams_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'TokenomicsParams_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'TokenomicsParams',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPosition',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'LpStakingPosition',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'LpStakingPosition',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPosition',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'VrswStakingPosition',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'VrswStakingPosition',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Access to subgraph metadata',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_meta',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: '_Meta_',
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Subscription',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'token',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Token',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'tokens',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Token_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Token_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'Token',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pair',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Pair',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairs',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Pair_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Pair_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'Pair',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'User',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'users',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'User_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'User_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'User',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPosition',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'LiquidityPosition',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'LiquidityPosition',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairWhitelist',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'PairWhitelist',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairWhitelists',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairWhitelist_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairWhitelist_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'PairWhitelist',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserve',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'PairReserve',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'pairReserves',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairReserve_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'PairReserve_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'PairReserve',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'tokenomicsParams',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'TokenomicsParams',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'tokenomicsParams_collection',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'TokenomicsParams_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'TokenomicsParams_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'TokenomicsParams',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPosition',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'LpStakingPosition',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'LpStakingPosition',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPosition',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'id',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'ID',
                                    },
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'VrswStakingPosition',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition_filter',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            description: {
                                kind: 'StringValue',
                                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                                block: true,
                            },
                            name: {
                                kind: 'Name',
                                value: 'subgraphError',
                            },
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: '_SubgraphErrorPolicy_',
                                    },
                                },
                            },
                            defaultValue: {
                                kind: 'EnumValue',
                                value: 'deny',
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: {
                                        kind: 'Name',
                                        value: 'VrswStakingPosition',
                                    },
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Access to subgraph metadata',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_meta',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'block',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Block_height',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: '_Meta_',
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'ScalarTypeDefinition',
            description: {
                kind: 'StringValue',
                value: 'A string representation of microseconds UNIX timestamp (16 digits)\n',
                block: true,
            },
            name: {
                kind: 'Name',
                value: 'Timestamp',
            },
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Token',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'String',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'String',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Token_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Token_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Token_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'Token_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'symbol',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'name',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'decimals',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'TokenomicsParams',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'TokenomicsParams_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'TokenomicsParams_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'TokenomicsParams_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'TokenomicsParams_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'alpha',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'beta',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'gamma',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'b',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'r',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShare',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpShareFactor',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'User',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition_filter',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LiquidityPosition',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition_filter',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'LpStakingPosition',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPositions',
                    },
                    arguments: [
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'skip',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '0',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'first',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'Int',
                                },
                            },
                            defaultValue: {
                                kind: 'IntValue',
                                value: '100',
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderBy',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition_orderBy',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'orderDirection',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'OrderDirection',
                                },
                            },
                            directives: [],
                        },
                        {
                            kind: 'InputValueDefinition',
                            name: {
                                kind: 'Name',
                                value: 'where',
                            },
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition_filter',
                                },
                            },
                            directives: [],
                        },
                    ],
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'VrswStakingPosition',
                                },
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'User_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPositions_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'LiquidityPosition_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPositions_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'LpStakingPosition_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPositions_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'VrswStakingPosition_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'User_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'User_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'User_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswLockedPositionsNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'liquidityPositions',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lpStakingPositions',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'vrswStakingPositions',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'VrswStakingPosition',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'ID',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'User',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigInt',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'BigDecimal',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: 'VrswStakingPosition_filter',
            },
            fields: [
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'ID',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'ID',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'String',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_contains',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_contains_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_starts_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_starts_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_ends_with',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_not_ends_with_nocase',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'String',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user_',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'User_filter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigInt',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigInt',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_not',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_gt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_lt',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_gte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_lte',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BigDecimal',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu_not_in',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: {
                                    kind: 'Name',
                                    value: 'BigDecimal',
                                },
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Filter for the block changed event.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: '_change_block',
                    },
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'BlockChangedFilter',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'and',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'VrswStakingPosition_filter',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'InputValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'or',
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'VrswStakingPosition_filter',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: 'VrswStakingPosition_orderBy',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user__id',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'user__vrswLockedPositionsNumber',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'amount',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'lockDue',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'discountFactor',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'timestamp',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    name: {
                        kind: 'Name',
                        value: 'mu',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: '_Block_',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'The hash of the block',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'hash',
                    },
                    arguments: [],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Bytes',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'The block number',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'number',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Int',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Integer representation of the timestamp stored in blocks for the chain',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'timestamp',
                    },
                    arguments: [],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Int',
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'The hash of the parent block',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'parentHash',
                    },
                    arguments: [],
                    type: {
                        kind: 'NamedType',
                        name: {
                            kind: 'Name',
                            value: 'Bytes',
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'ObjectTypeDefinition',
            description: {
                kind: 'StringValue',
                value: 'The type for the top-level _meta field',
                block: true,
            },
            name: {
                kind: 'Name',
                value: '_Meta_',
            },
            fields: [
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Information about a specific subgraph block. The hash of the block\nwill be null if the _meta field has a block constraint that asks for\na block number. It will be filled if the _meta field has no block constraint\nand therefore asks for the latest  block\n',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'block',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: '_Block_',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'The deployment ID',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'deployment',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'String',
                            },
                        },
                    },
                    directives: [],
                },
                {
                    kind: 'FieldDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'If `true`, the subgraph encountered indexing errors at some past block',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'hasIndexingErrors',
                    },
                    arguments: [],
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: {
                                kind: 'Name',
                                value: 'Boolean',
                            },
                        },
                    },
                    directives: [],
                },
            ],
            interfaces: [],
            directives: [],
        },
        {
            kind: 'EnumTypeDefinition',
            name: {
                kind: 'Name',
                value: '_SubgraphErrorPolicy_',
            },
            values: [
                {
                    kind: 'EnumValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'Data will be returned even if the subgraph has indexing errors',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'allow',
                    },
                    directives: [],
                },
                {
                    kind: 'EnumValueDefinition',
                    description: {
                        kind: 'StringValue',
                        value: 'If the subgraph has indexing errors, data will be omitted. The default.',
                        block: true,
                    },
                    name: {
                        kind: 'Name',
                        value: 'deny',
                    },
                    directives: [],
                },
            ],
            directives: [],
        },
    ],
};

export default buildASTSchema(schemaAST, {
    assumeValid: true,
    assumeValidSDL: true,
});
