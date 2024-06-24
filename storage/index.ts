export default function useStorage() {
  return {
    get(key: string) {
      return JSON.parse(localStorage.getItem(key) || '{}')
    },
    set(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key: string) {
      localStorage.removeItem(key)
    }
  }
}
