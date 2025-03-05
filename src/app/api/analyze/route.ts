import OpenAI from 'openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { year, month, day, time, gender, birthplace } = body

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://api.lkeap.cloud.tencent.com/v1'
    })

    const response = await openai.chat.completions.create({
      model: "deepseek-v3",
      messages: [{
        role: "system",
        content: `你是一位资深命理专家，请使用Markdown格式输出分析结果。分析用户提供的信息（${year}年${month}月${day}日${time}，性别：${gender === 'male' ? '男' : '女'}，出生地点：${birthplace}）。

输出格式要求：
1. 使用标题、列表等Markdown语法
2. 内容分段清晰
3. 重要内容可以使用引用格式
4. 关键词可以使用加粗或斜体

分析内容包含：
# 基础信息
# 五行分析
# 命格特点
# 运势建议

使用中文口语化表达，避免专业术语。`
      },{
        role: "user", 
        content: `检查信息完整性，并按照格式分析命理`
      }]
    })

    return NextResponse.json({ 
      analysis: response.choices[0].message.content,
      success: true 
    })
    
  } catch (error) {
    console.error(error)
    return NextResponse.json({ 
      error: '解析失败，请稍后重试',
      success: false 
    }, { status: 500 })
  }
}
