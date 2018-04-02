// @flow

export type Id = string;
export type Text = string;

export type Note = {
	+id: Id,
	+task: Text,
}

export type Lane = {
	+id: Id,
	+name: Text,
	+notes: Array<string>,
}

export type Notes = { [key: string]: Note };
export type Lanes = { [key: string]: Lane };

export const ItemTypes = {
	NOTE: 'note'
};
