import runpod
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, StoppingCriteria, StoppingCriteriaList

model_name = "stabilityai/stablelm-tuned-alpha-7b"
m = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16).cuda()
tok = AutoTokenizer.from_pretrained(model_name)
generator = pipeline('text-generation', model=m, tokenizer=tok, device=0)


def generate(text):
    generated_text = ""
    while not generated_text:
        result = generator(text, max_new_tokens=1024, num_return_sequences=1, num_beams=1, do_sample=True,
                           temperature=1.0, top_p=0.95, top_k=1000)
        generated_text = result[0]["generated_text"].replace(text, "")
    return generated_text

def handler(event):
    print(event)
   
    input_text = event.get('input', {}).get('prompt', None)

    print(input_text)

    if not input_text:
        return { "error": "No input text provided" }

    start_message = """# StableAssistant
    
- StableAssistant is A helpful and harmless Open Source AI Language Model developed by Stability and CarperAI.

- StableAssistant is excited to be able to help the user, and answers any questions the user may have.

- StableAssistant is more than just an information source, StableAssistant is also able to write code, short stories, and make jokes.

- StableAssistant responds in a concise and clear manner, like a human and friend.
"""
    input_text = f"{start_message}\n{input_text}"
    
    try:
        output_text = generate(input_text)
        return { "output": output_text }    
    except Exception as e:
        return { "error": str(e) }


runpod.serverless.start({
    "handler": handler
})