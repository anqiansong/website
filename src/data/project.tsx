import { sortBy } from '@site/src/utils/jsUtils'

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'arch' | 'design' | 'golang' | 'java' | 'tools' | 'sre' |'latest'

export type Project = {
  title: string
  description: string
  preview?: any
  website: string
  tags: TagType[]
  date: string
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: 'Favorite',
    description: '收藏',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源类资源',
    color: '#39ca30',
  },
  arch: {
    label: '架构',
    description: '架构',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: 'Beautiful Docusaurus sites, polished and standing out from the initial template!',
    color: '#a44fb7',
  },
  golang: {
    label: 'Go',
    description: 'Go 语言相关资源',
    color: '#dfd545',
  },
  java: {
    label: 'Java',
    description: 'Java 相关资源',
    color: '#007acc',
  },
  tools: {
    label: '工程效率',
    description: '工程效率相关资源',
    color: '#39ca30',
  },
  sre: {
    label: 'SRE',
    description: 'SRE 相关资源',
    color: '#3F8E68',
  },
  latest: {
    label: 'latest',
    description: 'latest project',
    color: '#EC0888',
  },
}

const Projects: Project[] = [
  {
    title: 'Microsoft Build',
    description: '应用程序架构基础',
    preview: require('./resource/microsoft-build.png'),
    website: 'https://docs.microsoft.com/en-us/azure/architecture/guide/',
    tags: ['opensource', 'arch'],
    date: '2022-05-20',
  },
  {
    title: '凤凰架构',
    description: '构建可靠的大型分布式系统',
    preview: require('./resource/icyfenix.png'),
    website: 'http://icyfenix.cn/',
    tags: ['opensource', 'arch'],
    date: '2022-05-14',
  },
]

function isLatest(date) {
  if (!date) {
    return false
  }
  var d = new Date()
  var duration = d.getTime() - Date.parse(date)
  return duration <= 7 * 24 * 3600 * 1000
}

export const TagList = Object.keys(Tags) as TagType[]
function sortProject() {
  let result = Projects
  result.map((project)=>{
    if (isLatest(project.date)){
      project.tags.push('latest')
    }
  })
  // Sort by date asc
  result = sortBy(result, (user) => new Date().getTime()-Date.parse(user.date));
  // Sort by site name
  // result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  // result = sortBy(result, (user) => !user.tags.includes('javascript'));
  return result
}

export const sortedProjects = sortProject()
