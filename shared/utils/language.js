const handleChaneLang = (newLang) => {
  console.log('< HANDLE CHANGE LANG > ', newLang)
  const opts = ["en-US", "es-ES", "pt-BR"]

  if (opts.includes(newLang)) {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; expires=Thu, 18 Dec ${new Date().getFullYear() + 2} 12:00:00 UTC`
    window.location.href = '/'
  }
}

export default handleChaneLang