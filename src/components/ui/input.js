const Input = ({ value, onChange, placeholder }) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
    />
  )
  
  export { Input }
  