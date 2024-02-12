# Interface: TranslateResultNode

## Table of contents

### Properties

- [source](TranslateResultNode.md#source)
- [translation](TranslateResultNode.md#translation)
- [type](TranslateResultNode.md#type)

## Properties

### source

• **source**: `Object`

Source for translation

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | Language of the source text |
| `text` | `string` | Source text |

#### Defined in

[google-sr/src/constants.ts:28](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L28)

___

### translation

• **translation**: `Object`

Translated content

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | Language of the translated text |
| `pronunciation?` | `string` | Pronunciation of the translation in english Only available in certain cases |
| `text` | `string` | translated text |

#### Defined in

[google-sr/src/constants.ts:41](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L41)

___

### type

• **type**: [`TranslateResult`](../enums/ResultTypes.md#translateresult)

Type of this result node

#### Defined in

[google-sr/src/constants.ts:24](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L24)
