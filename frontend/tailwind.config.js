module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155', accent: { yellow: '#f59e0b', green: '#22c55e', blue: '#3b82f6' }, text: { primary: '#ffffff', secondary: '#94a3b8', muted: '#64748b' } },
      fontFamily: { poppins: ['Poppins', 'sans-serif'], inter: ['Inter', 'sans-serif'] }
    }
  },
  plugins: []
}