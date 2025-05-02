"use client"

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'accent' | 'white'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  // Determine the size classes
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  // Determine the color classes
  const colorClasses = {
    primary: 'border-t-[var(--toolnest-primary-500)]',
    accent: 'border-t-[var(--toolnest-accent-500)]',
    white: 'border-t-white',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          border-4 
          border-[var(--toolnest-gray-200)]
          dark:border-[var(--toolnest-gray-700)]
          rounded-full 
          animate-spin
        `}
      />
    </div>
  )
}

export default LoadingSpinner 