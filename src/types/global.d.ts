export { };

declare global {

  type UserType = 'user' | 'ai'

  interface ConversationType {
    id: number,
    user: UserType,
    message: string | 'typing-indicator',
  }

}
