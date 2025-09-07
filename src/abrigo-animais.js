import promptSync from "prompt-sync";
const prompt = promptSync();

class AbrigoAnimais {
    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
        // Tirei o espaço e garanti que seja string
        brinquedosPessoa1 = String(brinquedosPessoa1).trim().toUpperCase();
        brinquedosPessoa2 = String(brinquedosPessoa2).trim().toUpperCase();
        ordemAnimais = String(ordemAnimais).trim();

        // Vira arrays e remove espço
        const BrinquedoPessoa1Array = brinquedosPessoa1
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

        const BrinquedoPessoa2Array = brinquedosPessoa2
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

        const ordemAnimalArray = ordemAnimais
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");


        const ListaBrinquedo = [
            "RATO",   // 0
            "BOLA",   // 1
            "LASER",  // 2
            "CAIXA",  // 3
            "NOVELO", // 4
            "SKATE"   // 5
        ];

        const Animais = [
            { nome: "Rex", especie: "cão", brinquedosFavoritos: ["RATO", "BOLA"] },
            { nome: "Mimi", especie: "gato", brinquedosFavoritos: ["BOLA", "LASER"] },
            { nome: "Fofo", especie: "gato", brinquedosFavoritos: ["BOLA", "RATO", "LASER"] },
            { nome: "Zero", especie: "gato", brinquedosFavoritos: ["RATO", "BOLA"] },
            { nome: "Bola", especie: "cão", brinquedosFavoritos: ["CAIXA", "NOVELO"] },
            { nome: "Bebe", especie: "cão", brinquedosFavoritos: ["LASER", "RATO", "BOLA"] },
            { nome: "Loco", especie: "jabuti", brinquedosFavoritos: ["SKATE", "RATO"] }
        ];

        // Funçãopara checar se a ordem aparece dentro da lista de brinquedos
        function verificaOrdem(preferidos, listaPessoa) {
            let n = 0;
            for (let brinquedo of listaPessoa) {
                if (brinquedo === preferidos[n]) n++;
                if (n === preferidos.length) break;
            }
            return n === preferidos.length;
        }

        // Erros
        const ErroAnimal = { erro: "Animal inválido" };
        const ErroBrinquedo = { erro: "Brinquedo inválido" };

        // Validar animais
        if (!ordemAnimalArray.every(nome => Animais.some(animal => animal.nome === nome)) ||
            new Set(ordemAnimalArray).size !== ordemAnimalArray.length) {
            return ErroAnimal;
        }

        // Validar brinquedos
        if (!BrinquedoPessoa1Array.every(b => ListaBrinquedo.includes(b)) ||
            new Set(BrinquedoPessoa1Array).size !== BrinquedoPessoa1Array.length) {
            return ErroBrinquedo;
        }
        if (!BrinquedoPessoa2Array.every(b => ListaBrinquedo.includes(b)) ||
            new Set(BrinquedoPessoa2Array).size !== BrinquedoPessoa2Array.length) {
            return ErroBrinquedo;
        }

        // adoções
        const resultado = [];
        const animaisAdotadosPessoa1 = [];
        const animaisAdotadosPessoa2 = [];

        for (let nomeAnimal of ordemAnimalArray) {
            const animal = Animais.find(a => a.nome === nomeAnimal);

            let p1Gosta = verificaOrdem(animal.brinquedosFavoritos, BrinquedoPessoa1Array);
            let p2Gosta = verificaOrdem(animal.brinquedosFavoritos, BrinquedoPessoa2Array);

            // Regra especial para LOCO
            if (animal.nome === "LOCO") {
                if ((animaisAdotadosPessoa1.length + animaisAdotadosPessoa2.length) > 0) {
                    if (animaisAdotadosPessoa1.length > 0) p1Gosta = true;
                    else if (animaisAdotadosPessoa2.length > 0) p2Gosta = true;
                } else {
                    p1Gosta = false;
                    p2Gosta = false;
                }
            }

            let dono = "abrigo";

            if (animal.especie === "gato") {
                // Gato não divide
                if (p1Gosta && p2Gosta) dono = "abrigo";
                else if (p1Gosta) dono = "pessoa 1";
                else if (p2Gosta) dono = "pessoa 2";
            } else {
                if (p1Gosta && p2Gosta) dono = "abrigo";
                else if (p1Gosta) dono = "pessoa 1";
                else if (p2Gosta) dono = "pessoa 2";
            }

            // Limite de 3 animais
            if (dono === "pessoa 1" && animaisAdotadosPessoa1.length >= 3) dono = "abrigo";
            if (dono === "pessoa 2" && animaisAdotadosPessoa2.length >= 3) dono = "abrigo";

            if (dono === "pessoa 1") animaisAdotadosPessoa1.push(animal.nome);
            if (dono === "pessoa 2") animaisAdotadosPessoa2.push(animal.nome);

            resultado.push(`${animal.nome} - ${dono}`);
        }
        resultado.sort();

        return { lista: resultado };
    }
}

export { AbrigoAnimais };





const ojb = new AbrigoAnimais().encontraPessoas("RATO,BOLA", "Rato, Bola", "Rex");
console.log(ojb);

const oo = new AbrigoAnimais().encontraPessoas("RATO", "Bola, Caixa, Laser", "Rex, Bola, Fofo");
console.log(oo);

const nint = new AbrigoAnimais().encontraPessoas("", "", "Rex")
console.log(nint);