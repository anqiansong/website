import React from 'react'

import { useTrail, animated } from 'react-spring'

import HeroMain from './img/hero_main.svg'

import GithubIcon from '@site/static/icons/github.svg'
import ZhiICon from '@site/static/icons/zhihu.svg'
import CsdnIcon from '@site/static/icons/csdn.svg'
import SegmentFault from '@site/static/icons/segment_fault.svg'

import Button from '../Button'

import styles from './styles.module.css'

function Hero() {
  // animation
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })

  return (
    <animated.div className={styles.hero}>
      <div className={styles.bloghome__intro}>
        <animated.div style={animatedTexts[0]} className={styles.hero_text}>
          Hello! 我是
          <span className={styles.intro__name}>Keson</span>
        </animated.div>
        <animated.p style={animatedTexts[1]}>
           go-zero 开源项目主要贡献人之一，goctl 维护人，字节跳动开发工程师
        </animated.p>
        <SocialLinks animatedProps={animatedTexts[4]} />
        {
          <animated.div style={animatedTexts[2]}>
            <Button isLink href={'./about'}>
              自我介绍
            </Button>
          </animated.div>
        }
      </div>
      <HeroMainImage />
    </animated.div>
  )
}

function SocialLinks({ animatedProps, ...props }) {
  return (
    <animated.div className={styles.social__links} style={animatedProps}>
      <a href='https://github.com/anqiansong' target='_blank'>
        <GithubIcon />
      </a>
      <a href='https://www.zhihu.com/people/anqiansong' target='_blank'>
        <ZhiICon />
      </a>
      <a href='https://segmentfault.com/u/keson_5df35bd908e03' target='_blank'>
        <SegmentFault />
      </a>
      {<a href='https://blog.csdn.net/QQ243223991' target='_blank'>
        <CsdnIcon />
      </a>}
    </animated.div>
  )
}

function HeroMainImage() {
  return (
    <div className={styles.bloghome__image}>
      <HeroMain />
    </div>
  )
}

export default Hero
