export type CustomerRoomData = {
  data: {
    customer_rooms: CustomerRoom[]
  }
  meta: {
    current_total: number
    cursor_after: string
    cursor_before: string
  }
  status: number
}

export type CustomerRoom = {
  channel_id: number
  contact_id?: number
  id: number
  is_calling: boolean
  is_handled_by_bot: boolean
  is_resolved: boolean
  is_waiting: boolean
  last_comment_sender: string
  last_comment_sender_type: string
  last_comment_text: string
  last_comment_timestamp: string
  last_customer_comment_text?: string
  last_customer_timestamp: string
  name: string
  room_badge?: string
  room_id: string
  room_type: string
  source: string
  user_avatar_url: string
  user_id: string
}
