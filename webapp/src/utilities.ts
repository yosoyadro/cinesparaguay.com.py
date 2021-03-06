// axios
import axios from 'axios'

// set server url
const server = window.location.protocol+'//admin.cinesparaguay.com.py/api'

export default{
    getItems: async function(category:string, request:string){
    
      const response = await axios.get(server+'/items/'+request).catch(error => {
          console.log(error.response)
          //router.push('/disconnected')
          throw 'Error de Servidor'
      })

      const items = response.data

      Promise.resolve(response).then(()=>{
        // news
        if (category == "noticias") {
          items.data.forEach((item: {[key: string]:any}, index:number) => {
            if (item.portada !== null && item.titulo !== null && item.creado !== null) {
              items.data[index].creado = this.getElapsedTime(item.creado)
            }
          })
        }

        // movies
        if (category == "peliculas") {
          items.data.forEach((item: {[key: string]:any}, index:number) => {
            
            items.data[index].titulo = (item.titulo_local) ? item.titulo_local : item.titulo_original
            
            if (item.fecha_local == this.getThu()) {
              items.data[index].estreno = true
            }
          })
        }
      })

      return items
    },
    getThu: function() {
      // set dates
      const today = new Date()
      let thisThu = new Date()
      const thuNmb = 4
      let todayNmb = today.getDay()

      // set number for sunday
      if (todayNmb == 0) {
          todayNmb = 7
      }

      // if not default day number
      if (todayNmb != 4) {
          const diff = (todayNmb > thuNmb) ? todayNmb - thuNmb : thuNmb + (todayNmb -1 )
          thisThu.setDate(today.getDate() - diff)
      } else {
          thisThu = today
      }

      thisThu = this.getStringDate(thisThu) as any

      return thisThu
    },
    getStringDate: function(date: Date){
      const dd = String(date.getDate()).padStart(2, '0')
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const yyyy = date.getFullYear()
      const formattedDate = yyyy + '-' + mm + '-' + dd as any 

      return formattedDate
    },
    getElapsedTime: function(date:string) {
      date = date.replace(' ', 'T') + 'Z'
      const prevTime = new Date(date)
      const thisTime = new Date()
      let timeDiff = thisTime.getTime() - prevTime.getTime()
      timeDiff /= 1000;
      timeDiff = Math.round(timeDiff)

      let time

      if (timeDiff > 31536000) {
          timeDiff = Math.round(timeDiff / 31536000)
          time = (timeDiff <= 1) ? 'a??o' : 'a??os'
      } else if (timeDiff > 2629750) {
          timeDiff = Math.round(timeDiff / 2629750)
          time = (timeDiff <= 1) ? 'mes' : 'meses'
      } else if (timeDiff > 604800) {
          timeDiff = Math.round(timeDiff / 604800)
          time = (timeDiff <= 1) ? 'semana' : 'semanas'
      } else if (timeDiff > 86400) {
          timeDiff = Math.round(timeDiff / 86400)
          time = (timeDiff <= 1) ? 'd??a' : 'd??as'
      } else if (timeDiff > 3600) {
          timeDiff = Math.round(timeDiff / 3600)
          time = (timeDiff <= 1) ? 'hora' : 'horas'
      } else if (timeDiff > 60) {
          timeDiff = Math.round(timeDiff / 60)
          time = (timeDiff <= 1) ? 'minuto' : 'minutos'
      }

      return 'Hace ' + timeDiff + ' ' + time
    },
    getFormatedDate: function(date:string) {
        let formatedDate
        formatedDate = new Date(date + 'T12:00:00.000Z')
        formatedDate = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeZone: 'America/Argentina/Buenos_Aires' } as any).format(formatedDate)
        return formatedDate
    },
    setHeader: function(type = '', item: any[string] = []) {
      let image
      let description
      const url = window.location

      const title = item.titulo

      if (type == 'noticias') {
        image = item.portada.data.full_url
        description = item.contenido.substring(0, 120).replace('<p>', '')
      } else if ('peliculas' && item.sinopsis != null) {
        image = item.portada.data.full_url
        description = item.sinopsis.substring(0, 120).replace('<p>', '')
      } else {
        image = window.location.protocol + '//' + window.location.hostname + '/assets/img/main.jpg'
        description = '??Encontr?? toda la informaci??n actualizada del cine en Paraguay!'
      }

      const documentElement = document as any

      // Primary Tags
      documentElement.querySelector('head title').textContent = (title) ? title + ' - CinesParaguay' : 'CinesParaguay'
      documentElement.querySelector('[name="description"]').setAttribute('content', description)

      // Facebook
      documentElement.querySelector('[property="og:image"]').setAttribute('content', image)
      documentElement.querySelector('[property="og:title"]').setAttribute('content', title + ' - EnElCine')
      documentElement.querySelector('[property="og:url"]').setAttribute('content', url)
      documentElement.querySelector('[property="og:description"]').setAttribute('content', description)

      // Twitter
      documentElement.querySelector('[property="twitter:image"]').setAttribute('content', image)
      documentElement.querySelector('[property="twitter:title"]').setAttribute('content', title + ' - EnElCine')
      documentElement.querySelector('[property="twitter:url"]').setAttribute('content', url)
      documentElement.querySelector('[property="twitter:description"]').setAttribute('content', description)
    }
}