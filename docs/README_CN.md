# Larry's AI 网站

欢迎来到 Larry 的 AI 网站！该网站目前正在开发中。如果您有任何问题，请在 GitHub 上联系我。

- [English](./README.md)

## 在线演示

您可以在 [ai.larryxue.dev](https://ai.larryxue.dev/) 上查看在线演示。

## 技术细节

该网站使用 [Nuxt v3](https://nuxt.com/) 和 [Nuxt UI](https://ui.nuxt.com) 进行开发。AI 模型由 Cloudflare AI Workers 提供支持。

## 如何私密部署

### 创建 Fork 并推送到 Cloudflare Pages

1. 创建此存储库的 Fork。
2. 转到 Cloudflare Pages 并选择此存储库作为源。
3. 创建一个新的 Cloudflare Pages 站点。

### 创建 Cloudflare Worker AI

**在设置每个 AI 模型后，配置您的 Worker 环境：**
1. 转到 *设置 > 变量 > AI 绑定*。
2. 创建一个名为 *AI* 的环境。

#### 聊天模型代码

```ts
export default {
  async fetch(request, env) {
    const messages = await request.json();
    const response = await env.AI.run('@cf/meta/llama-2-7b-chat-fp16', { messages });

    return Response.json(response);
  }
};
```

#### 翻译模型代码

```ts
// 此模型已设置源语言和目标语言
// 您可以更改源语言和目标语言
export default {
  async fetch(request, env) {
    const { text, source_lang, target_lang } = await request.json();
    const inputs = {
      text,
      source_lang: source_lang || 'zh',
      target_lang: target_lang || 'en'
    };
    const response = await env.AI.run('@cf/meta/m2m100-1.2b', inputs);

    return Response.json(response);
  }
};
```

#### 文本转图像模型代码

```ts
export default {
  async fetch(request, env) {
    const { prompt } = await request.json();

    const response = await env.AI.run(
      '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      { prompt }
    );

    return new Response(response, {
      headers: {
        'content-type': 'image/png'
      }
    });
  }
};
```

### 设置页面环境变量

转到 *页面 > 设置 > 环境变量* 并设置以下变量：

```bash
CLOUDFLARE_WORKER_URL=your-chat-ai-worker-url
CLOUDFLARE_TRANSLATE_WORKER_URL=your-translate-ai-worker-url
CLOUDFLARE_TEXT2IMAGE_WORKER_URL=your-text2image-ai-worker-url
```

几乎完成了！

### 更多设置

您可以通过阅读 Cloudflare AI 文档来更改默认的 AI 模型。

## 贡献

如果您想贡献，请参阅 [CONTRIBUTING](CONTRIBUTING.md) 指南。