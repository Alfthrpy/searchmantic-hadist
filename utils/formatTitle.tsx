function formatTitle(input: string): string {
    return input
      .split('_') // Pisahkan string berdasarkan underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama setiap kata
      .join(' '); // Gabungkan kembali dengan spasi
  }

export default formatTitle