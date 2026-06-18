"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string
  onChange: (value: string) => void
  typeMode?: "mobile" | "landline"
}

export function PhoneInput({ className, value, onChange, typeMode = "mobile", id, ...props }: PhoneInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const selectionRef = React.useRef<number | null>(null)

  const getDigits = (val: string) => val.replace(/\D/g, "")

  const formatMobile = (digits: string) => {
    let cleaned = digits
    if (cleaned.startsWith("7") || cleaned.startsWith("8")) {
      cleaned = cleaned.substring(1)
    }
    cleaned = cleaned.substring(0, 10)

    if (cleaned.length === 0) return ""
    
    let result = "+7 "
    if (cleaned.length > 0) result += "(" + cleaned.substring(0, 3)
    if (cleaned.length >= 3) result += ") " + cleaned.substring(3, 6)
    if (cleaned.length >= 6) result += "-" + cleaned.substring(6, 8)
    if (cleaned.length >= 8) result += "-" + cleaned.substring(8, 10)
    return result
  }

  const formatLandline = (digits: string) => {
    const cleaned = digits.substring(0, 7)
    if (cleaned.length === 0) return ""
    
    let result = ""
    if (cleaned.length > 0) result += cleaned.substring(0, 3)
    if (cleaned.length >= 3) result += "-" + cleaned.substring(3, 7)
    return result
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    if (e.key !== "Backspace") return

    const start = input.selectionStart
    const end = input.selectionEnd

    if (start === null || end === null || start !== end) return

    const charToDelete = input.value[start - 1]
    
    if (charToDelete === " " || charToDelete === "(" || charToDelete === ")" || charToDelete === "-") {
      e.preventDefault()
      
      let valueBeforeCursor = input.value.substring(0, start - 1)
      const valueAfterCursor = input.value.substring(start)
      
      while (valueBeforeCursor.length > 0 && /\D/.test(valueBeforeCursor[valueBeforeCursor.length - 1])) {
        valueBeforeCursor = valueBeforeCursor.slice(0, -1)
      }
      
      if (valueBeforeCursor.length > 0) {
        valueBeforeCursor = valueBeforeCursor.slice(0, -1)
      }

      const combinedDigits = getDigits(valueBeforeCursor + valueAfterCursor)
      const formatted = typeMode === "mobile" ? formatMobile(combinedDigits) : formatLandline(combinedDigits)
      
      let digitsInBefore = getDigits(valueBeforeCursor).length
      let targetPos = 0
      let digitsCount = 0

      for (let i = 0; i < formatted.length; i++) {
        if (digitsCount === digitsInBefore) {
          if (typeMode === "mobile" && formatted.substring(i).startsWith("7 ")) {
            // skip
          } else {
            targetPos = i
            break
          }
        }
        if (/\d/.test(formatted[i])) {
          if (typeMode === "mobile" && digitsCount === 0 && formatted[i] === "7" && i < 2) {
            // skip
          } else {
            digitsCount++
          }
        }
        targetPos = i + 1
      }

      if (typeMode === "mobile" && targetPos < 4 && formatted.length > 0) {
        targetPos = 5
      }

      selectionRef.current = targetPos
      onChange(formatted)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const originalValue = input.value
    const originalSelectionStart = input.selectionStart || 0

    const digitsBeforeCursor = getDigits(originalValue.substring(0, originalSelectionStart))
    const totalDigits = getDigits(originalValue)

    const formatted = typeMode === "mobile" ? formatMobile(totalDigits) : formatLandline(totalDigits)
    
    let targetSelectionStart = 0
    let digitsFound = 0
    
    for (let i = 0; i < formatted.length; i++) {
      if (digitsFound === digitsBeforeCursor.length) {
        if (typeMode === "mobile" && formatted.substring(i).startsWith("7 ")) {
          // skip
        } else {
          targetSelectionStart = i
          break
        }
      }
      if (/\d/.test(formatted[i])) {
        if (typeMode === "mobile" && digitsFound === 0 && formatted[i] === "7" && i < 2) {
          // skip
        } else {
          digitsFound++
        }
      }
      targetSelectionStart = i + 1
    }

    if (typeMode === "mobile" && targetSelectionStart < 4 && formatted.length > 0) {
      targetSelectionStart = 5
    }

    selectionRef.current = targetSelectionStart
    onChange(formatted)
  }

  React.useLayoutEffect(() => {
    if (inputRef.current && selectionRef.current !== null) {
      inputRef.current.setSelectionRange(selectionRef.current, selectionRef.current)
      selectionRef.current = null
    }
  }, [value])

  React.useEffect(() => {
    onChange("")
  }, [typeMode])

  return (
    <Input
      ref={inputRef}
      id={id}
      type="text"
      placeholder={typeMode === "mobile" ? "+7 (999) 999-99-99" : "333-4444"}
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={className}
      {...props}
    />
  )
}