import videoCuraJesus from '../assets/photos/video-cura-jesus.webp'
import videoFases from '../assets/photos/video-fases.webp'
import videoSanto from '../assets/photos/video-santo-pra-sempre.webp'
import videoLouvarei from '../assets/photos/video-te-louvarei.webp'
import videoVemJesus from '../assets/photos/video-vem-jesus-vem.webp'

export const artist = {
  name: 'Giselli Cristina',
  tagline: 'A voz por trás de Meu Barquinho',
  instagram: '@gisellicristinacantora',
  youtube: 'Giselli Cristina',
  label: 'Maximus Records',
}

// Marcação simples: **frase** vira ênfase (marca-texto rosa); [texto] vira destaque
// maior em itálico rosa — a mesma linguagem usada na página da dupla.
export const about = {
  title: 'Sobre Giselli Cristina',
  paragraphs: [
    'Há quase 30 anos a voz de Giselli Cristina segue como maré: nunca para, sempre volta. Uma trajetória de grandes sucessos, milhões de ouvintes e uma conexão genuína com o público cristão fez dela uma referência da música gospel no Brasil.',
    'Foi em [Meu Barquinho] que essa voz ganhou o país inteiro: a canção virou porto seguro pra quem ouve, uma das mais lembradas do gospel brasileiro, e segue guiando um repertório que atravessa gerações.',
    'Nos anos de ouro do mercado fonográfico gospel, Giselli foi um dos grandes fenômenos de vendas físicas do segmento: uma carreira construída disco a disco, show a show, em todo o território nacional.',
    'Hoje a discografia passa de **1 bilhão de streams**, resultado de uma carreira feita de excelência, autenticidade e uma identificação genuína com quem ouve.',
  ],
  closing:
    'Mais do que uma cantora, Giselli Cristina é maré, é porto, é bondade cantada: uma geração inteira da música gospel brasileira marcada por fé, excelência e canções que continuam emocionando o país.',
}

export const stats = [
  { value: '30', suffix: ' anos', label: 'de carreira' },
  { raw: 1_000_000_000, prefix: '+', label: 'streams acumulados' },
  { raw: 1_000_000, prefix: '+', label: 'discos vendidos' },
  { value: 'Disco de Ouro', label: 'com "Eu Só Quero Adorar"' },
]

export const songs = [
  'Meu Barquinho',
  'Eu Só Quero Adorar',
  'Quero Adorá-Lo',
  'Outra Vez o Mar',
  'Tua Santidade',
  'Confiarei',
  'Bondade de Deus',
  'Em Adoração',
  'Fases',
]

export const currentMoment = {
  title: 'Momento Atual',
  paragraphs: [
    'Giselli Cristina vive a fase mais expressiva da carreira — os grandes sucessos dos últimos anos se somam agora a uma conexão cada vez mais forte com o público, e a uma parceria especial: dividir o palco e os estúdios com o filho, Nicolas Henrique.',
  ],
}

export const streaming = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/3UZ4OGYI3ycaPT42PUS25B' },
  { name: 'Apple Music', url: 'https://music.apple.com/br/artist/giselli-cristina/688705142' },
  { name: 'YouTube', url: 'https://www.youtube.com/@gisellicristinaoficial' },
  { name: 'Amazon Music', url: 'https://music.amazon.com.br/artists/B00EKQ8ZHK/giselli-cristina' },
  { name: 'Deezer', url: 'https://www.deezer.com/en/artist/5098383' },
]

export const contact = {
  title: 'Contato para Imprensa, Entrevista e Eventos',
  label: 'Maximus Records',
  instagram: '@gisellicristinacantora',
  youtube: 'Giselli Cristina',
}

export const meuBarquinho = {
  title: 'Meu Barquinho',
  description:
    'O clássico que projetou Giselli Cristina para todo o país e se tornou uma das músicas mais lembradas da música gospel brasileira.',
  url: null,
}

export const videos = {
  title: 'Vídeos',
  description: 'Apresentações, clipes e conteúdos oficiais.',
  main: 'https://www.youtube.com/embed/dfRye5vYGI8',
  mainTitle: 'Cura Jesus',
  mainThumbnail: videoCuraJesus,
  items: [
    { title: 'Fases', thumbnail: videoFases, url: 'https://www.youtube.com/watch?v=G_bzLfdmryM' },
    {
      title: 'Santo Pra Sempre — feat. Nicolas Henrique',
      thumbnail: videoSanto,
      url: 'https://www.youtube.com/watch?v=8zcx613PHLE',
    },
    {
      title: 'Te Louvarei — feat. Nicolas Henrique',
      thumbnail: videoLouvarei,
      url: 'https://www.youtube.com/watch?v=Dxelc3yHVQQ',
    },
    {
      title: 'Vem Jesus Vem — feat. CeCe Winans',
      thumbnail: videoVemJesus,
      url: 'https://www.youtube.com/watch?v=X4QFSafyzJ0',
    },
  ],
}

export const goldRecord = {
  eyebrow: 'Eu Só Quero Adorar',
  ctaLabel: 'Conheça o Disco de Ouro',
  song: 'Eu Só Quero Adorar',
  year: '2025',
  views: 17_993_828,
  paragraphs: [
    'Em 2025, [Eu Só Quero Adorar] virou o retrato mais recente da força de Giselli Cristina nas plataformas digitais. Gravada ao lado do filho, Nicolas Henrique (ele ao teclado, ela na voz), a canção ultrapassou 17 milhões de visualizações no clipe oficial e se tornou um dos grandes fenômenos da música gospel no streaming.',
    'Foi esse alcance que rendeu à dupla o **Disco de Ouro**, entregue pela Maximus Records: um reconhecimento reservado a poucas faixas, que marca o momento em que uma canção deixa de pertencer só à artista e passa a pertencer ao público que a levou tão longe.',
    'Mais do que um troféu na parede, o disco emoldurado registra um marco pouco comum: mãe e filho, juntos na mesma gravação, recebendo pelo mesmo trabalho o reconhecimento máximo do mercado fonográfico gospel.',
  ],
}

export const agenda = {
  description:
    'As próximas datas ainda não foram divulgadas aqui, mas a agenda de Giselli Cristina já está em andamento. Para verificar disponibilidade e reservar uma data para o seu evento, fale diretamente com Elivelton, assessor responsável pela agenda de shows.',
  contactName: 'Elivelton',
  whatsapp: '5591991616758',
}

export const hire = {
  title: 'Contrate Giselli Cristina',
  description:
    'Para igrejas, conferências, prefeituras e eventos, a contratação é feita pela Criative Music, assessoria oficial responsável pela agenda de shows de Giselli Cristina.',
  whatsapp: null,
  email: null,
  agency: {
    name: 'Criative Music',
    url: 'https://www.criativemusic.com.br/artista/gisellicristina',
  },
}

export const press = {
  title: 'Pronta para contar essa história',
  description:
    'Aqui está tudo que jornalista, produtor de rádio e TV ou organizador de evento precisa pra contar essa história: fotos oficiais em alta resolução, biografia completa e os números que sustentam **quase 30 anos de carreira**, reunidos num único arquivo, prontos pra usar.',
  mediaKitNote: 'Um PDF só, com biografia, fotos e dados de divulgação.',
  mediaKitUrl: '/midia-kit-giselli.pdf',
}

export const socials = [
  { name: 'Instagram', handle: '@gisellicristinacantora', url: 'https://www.instagram.com/gisellicristinacantora/' },
  { name: 'YouTube', handle: 'Giselli Cristina', url: 'https://www.youtube.com/@gisellicristinaoficial' },
]
