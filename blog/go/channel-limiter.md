---
title: 巧妙使用channel实现限流器
date: 2020-05-10
authors: keson
tags: [go, limiter, 限流器, channel]
---

![cover](../resource/202005/channel-limiter.png)

### 普通Limiter
特点：无时间限制，只要不超过数量就可通过

<!-- truncate -->

```go
// 基于channel阻塞实现
// 缺点：阻塞无时间限制
type (
	ChannelLimiter struct {
		bufferChannel chan golang.PlaceholderType
	}
)

func NewChannelLimiter(limit int) *ChannelLimiter {
	return &ChannelLimiter{bufferChannel: make(chan golang.PlaceholderType, limit)}
}

func (l *ChannelLimiter) Allow() bool {
	select {
	case l.bufferChannel <- golang.Placeholder:
		return true
	default:
		return false
	}
}

func (l *ChannelLimiter) Release() bool {
	<-l.bufferChannel
	return true
}

func (l *ChannelLimiter) Close() {
	close(l.bufferChannel)
}

```

### 令牌桶Limiter
特点：[令牌桶](https://baike.baidu.com/item/%E4%BB%A4%E7%89%8C%E6%A1%B6%E7%AE%97%E6%B3%95/6597000?fr=aladdin)

```go
// 令牌桶算法
// 产生令牌：均为间隔时间内（1秒）向指定桶中产生指定数量的令牌
// 消费令牌：从桶中获取令牌并消费
// 思路：通过channel阻塞原理来实现

type (
	TokenBucketLimiter struct {
		t      *time.Ticker
		bucket chan golang.PlaceholderType
		doneC  channel.DoneChan
		limit  int
		rate   int
		stop   func()
	}
)

// rate：token put rates per second
// limit：max limit
func NewTokenBucketLimiter(rate, limit int) *TokenBucketLimiter {
	t := time.NewTicker(time.Second)
	doneC := channel.NewDoneChan()
	bucket := make(chan golang.PlaceholderType, limit)
	tbl := &TokenBucketLimiter{
		rate:   rate,
		t:      t,
		bucket: bucket,
		doneC:  doneC,
		limit:  limit,
		// only stop once
		stop: routine.DoOnce(func() {
			doneC.Stop()
			close(bucket)
			t.Stop()
		}),
	}
	// 定时放置令牌
	tbl.asyncPutTokens()
	return tbl
}

// 通过尝试put golang.Placeholder 来达到是否有令牌可消费
func (tbl *TokenBucketLimiter) Allow() bool {
	select {
	case tbl.bucket <- golang.Placeholder:
		return true
	case <-tbl.doneC.Done():
		return false
	default:
		return false
	}
}

func (tbl *TokenBucketLimiter) Close() {
	tbl.stop()
}

// 通过排空channel达到放置token的目的
func (tbl *TokenBucketLimiter) asyncPutTokens() {
	safe.GoRun(func() {
		for {
			select {
			case <-tbl.t.C:
				tbl.drain()
			case <-tbl.doneC.Done():
				return
			}
		}
	})
}

func (tbl *TokenBucketLimiter) drain() {
	for i := 0; i < tbl.limit; i++ {
		select {
		case <-tbl.bucket:
		default:
			return
		}
	}
}

```
