import requests, os

urls = {
    "logo.png": "https://public.readdy.ai/gen_page/readdy-logo.png",
    "ufps-logo.png": "https://readdy.ai/api/search-image?query=Universidad%20Francisco%20de%20Paula%20Santander%20official%20logo%20design%2C%20university%20emblem%20with%20academic%20symbols%2C%20blue%20and%20green%20colors%2C%20professional%20educational%20institution%20logo%2C%20clean%20background%2C%20Colombian%20university%20branding&width=120&height=120&seq=ufps-logo&orientation=squarish",
    "student-3d.png": "https://readdy.ai/api/search-image?query=Happy%203D%20cartoon%20university%20student%20character%20with%20backpack%20and%20books%2C%20cheerful%20animated%20mascot%20similar%20to%20SENA%20Betowa%20style%2C%20modern%203D%20rendering%20with%20blue%20and%20green%20university%20colors%2C%20friendly%20expression%20for%20educational%20website&width=150&height=150&seq=3d-student-char&orientation=squarish",
    "game-mascot.png": "https://readdy.ai/api/search-image?query=Cute%203D%20cartoon%20game%20mascot%20character%20holding%20chess%20piece%20and%20cards%2C%20playful%20animated%20design%20similar%20to%20SENA%20style%2C%20colorful%203D%20rendering%20with%20game%20elements%2C%20friendly%20character%20for%20educational%20gaming%20website&width=150&height=150&seq=3d-game-char&orientation=squarish",
    "librarian.png": "https://readdy.ai/api/search-image?query=Friendly%203D%20cartoon%20librarian%20character%20with%20glasses%20and%20books%2C%20professional%20animated%20mascot%20similar%20to%20SENA%20Betowa%20design%2C%20modern%203D%20rendering%20with%20blue%20and%20green%20colors%2C%20educational%20staff%20character&width=150&height=150&seq=3d-librarian-char&orientation=squarish",
    "mascot.png": "https://readdy.ai/api/search-image?query=Adorable%203D%20cartoon%20university%20mascot%20character%20with%20graduation%20cap%2C%20cheerful%20animated%20design%20similar%20to%20SENA%20style%2C%20modern%203D%20rendering%20with%20educational%20theme%2C%20friendly%20school%20spirit%20character&width=150&height=150&seq=3d-mascot-char&orientation=squarish",
    "pattern-bg.png": "https://readdy.ai/api/search-image?query=Beautiful%20geometric%20pattern%20background%20with%20educational%20elements%2C%20university%20symbols%2C%20modern%20abstract%20design%20with%20blue%20green%20purple%20gradients%2C%20clean%20minimalist%20style%20for%20education%20website&width=1920&height=1080&seq=pattern-bg&orientation=landscape",
    "main-character.png": "https://readdy.ai/api/search-image?query=Friendly%203D%20cartoon%20university%20student%20character%20sitting%20cross-legged%20with%20laptop%2C%20cheerful%20expression%2C%20blue%20and%20green%20university%20colors%2C%20modern%203D%20rendering%20style%20similar%20to%20SENA%20Betowa%20character%2C%20educational%20mascot%20design&width=400&height=500&seq=main-character&orientation=portrait",
    "bottom-pattern.png": "https://readdy.ai/api/search-image?query=Decorative%20pattern%20border%20with%20educational%20icons%20and%20geometric%20shapes%2C%20university%20theme%2C%20colorful%20design%20elements%2C%20bottom%20border%20decoration%20for%20educational%20website&width=1920&height=200&seq=bottom-pattern&orientation=landscape",
}

os.makedirs("assets", exist_ok=True)
for name,url in urls.items():
    print("Descargando", name)
    r=requests.get(url)
    if r.status_code==200:
        open(os.path.join("assets",name),"wb").write(r.content)
    else:
        print("Error al descargar", name, r.status_code)
print("Descarga completada.")
