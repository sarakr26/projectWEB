"use client"

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => {
  const sizeClass = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }[size]

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClass} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
      <div className="ml-4 text-gray-500 font-medium">
        {size === 'large' && <span>Loading...</span>}
      </div>
    </div>
  )
}

export default LoadingSpinner 