import type { ChatMessage, CustomerRoom, CustomerRoomData } from '@/types/chat'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import listRooms from '@/data/list_rooms.json'
import messageData from '@/data/messages.json'

export const useChatStore = defineStore('chat', () => {
  const rooms = ref<CustomerRoom[]>([])
  const messages = ref<ChatMessage[]>([])
  const currentRoomId = ref<string | null>(null)

  const currentRoom = computed(() => {
    return rooms.value.find((room) => room.room_id === currentRoomId.value)
  })

  function loadRooms() {
    const data = listRooms as CustomerRoomData
    rooms.value = data.data.customer_rooms
  }

  function loadMessages(roomId: string) {
    const isEven = parseInt(roomId, 10) % 2 === 0
    messages.value = isEven ? (messageData[0] as ChatMessage[]) : (messageData[1] as ChatMessage[])
  }

  function setCurrentRoom(roomId: string) {
    currentRoomId.value = roomId
    loadMessages(roomId)
  }

  function sendMessage(text: string) {
    if (!text.trim() || !currentRoomId.value) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      room_id: currentRoomId.value,
      sender: 'Agent',
      sender_type: 'agent',
      text: text.trim(),
      timestamp: new Date().toISOString(),
      is_own_message: true,
    }

    messages.value.push(newMessage)

    const room = rooms.value.find((r) => r.room_id === currentRoomId.value)
    if (room) {
      room.last_comment_text = text.trim()
      room.last_comment_timestamp = new Date().toISOString()
      room.last_comment_sender = 'Agent'
      room.last_comment_sender_type = 'agent'
    }
  }

  return {
    rooms,
    messages,
    currentRoomId,
    currentRoom,
    loadRooms,
    loadMessages,
    setCurrentRoom,
    sendMessage,
  }
})
