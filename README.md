# Larry's AI Site

Welcome to Larry's AI Site! This site is currently under development. If you have any questions, please contact me on GitHub.

## Live Demo

You can view the live demo at [ai.larryxue.dev](https://ai.larryxue.dev/).

## Technical Details

This site is developed using [Nuxt v3](https://nuxt.com/) and [Nuxt UI](https://ui.nuxt.com). The AI model is powered by Cloudflare AI Workers.

## How to Deploy Privately

### Create a Fork and Push to Cloudflare Pages

1. Create a fork of this repository.
2. Go to Cloudflare Pages and select this repository as the source.
3. Create a new Cloudflare Pages site.

### Create Cloudflare Worker AI

**After setting up each AI model, configure your worker environment:**
1. Go to *Settings > Variables > AI Bindings*.
2. Create an environment with the name *AI*.

#### Chat Model Code

```ts
export default {
  async fetch(request, env) {
    const messages = await request.json();
    const response = await env.AI.run('@cf/meta/llama-2-7b-chat-fp16', { messages });

    return Response.json(response);
  }
};
```

#### Translate Model Code

```ts
// This model has set the source_lang and target_lang
// You can change the source_lang and target_lang
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

#### Text to Image Model Code

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

### Set Pages Environment Variables

Go to *Pages > Settings > Environment Variables* and set the following variables:

```bash
CLOUDFLARE_WORKER_URL=your-chat-ai-worker-url
CLOUDFLARE_TRANSLATE_WORKER_URL=your-translate-ai-worker-url
CLOUDFLARE_TEXT2IMAGE_WORKER_URL=your-text2image-ai-worker-url
```

That's almost done!

### Further Settings

You can change the default AI model by reading the Cloudflare AI documentation.

## Contributing

If you want to contribute, please see the [CONTRIBUTING](CONTRIBUTING.md) guide.