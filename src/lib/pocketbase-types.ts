/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Rooms = "rooms",
	UserPubinfo = "user_pubinfo",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type RoomsRecord = {
	type: string
	is_full?: boolean
	current_users?: RecordIdString
}

export type UserPubinfoRecord = {
	skin: string
	user_id: RecordIdString
}

export type UsersRecord = {
	last_alive?: IsoDateString
	current_room?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type RoomsResponse = RoomsRecord & BaseSystemFields
export type UserPubinfoResponse = UserPubinfoRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	rooms: RoomsRecord
	user_pubinfo: UserPubinfoRecord
	users: UsersRecord
}