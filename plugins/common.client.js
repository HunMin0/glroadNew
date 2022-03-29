export default ({app}, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  //inject('hello', msg => console.log(`Hello ${msg}!`))
  inject('dayjsFormat', (time, format = 'YYYY-MM-DD HH:mm') => app.$dayjs(time).tz('Asia/Seoul').format(format))
  inject('getIcon', (type) => {
      var extension = type.split('/').pop();
      var icon = 'help-box';
      switch (extension) {
        case 'doc': case 'docx': icon = 'file-word'; break;
        case 'ppt': case 'pptx': icon = 'file-powerpoint'; break;
        case 'xls': case 'xlsx': icon = 'file-excel'; break;
        case 'hwp': icon = 'hwp.png'; break;
        /*case 'mp3': icon = 'mp3.png'; break;
        case 'mp4': icon = 'mp4.png'; break;*/
        case 'pdf': icon = 'file-pdf-box'; break;
        case 'txt': icon = 'text-box-outline'; break;
        case 'zip': icon = 'folder-zip'; break;
        case 'gif': icon = 'file-gif-box'; break;
        case 'jpg': case 'jpeg': icon = 'file-jpg-box'; break;
        case 'png': icon = 'file-png-box'; break;
      }
      return icon;
    }
  )
}
