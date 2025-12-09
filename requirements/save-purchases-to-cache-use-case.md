# Requirements – LocalSavePurchases

## Overview
O caso de uso **LocalSavePurchases** deve persistir um conjunto de `PurchasesModel`
no cache local através do `CacheStore`.  
A operação deve sempre sobrescrever qualquer dado anterior referente à mesma key.

---

## Functional Requirements

### **FR1 — Remover dados antigos antes de salvar**
O sistema deve apagar o valor existente no cache para a key informada.

### **FR2 — Salvar a nova lista de compras**
Após apagar, o sistema deve persistir os novos dados associados à key.

### **FR3 — A operação deve ser atômica**
Se o `delete` falhar, o `save` **não** deve ser executado.

### **FR4 — Propagar erros**
Qualquer erro lançado pelo `CacheStore` deve ser repassado
para o chamador do caso de uso.

---

## Non-Functional Requirements

### **NFR1 — Consistência**
☑️A sequência de execução (`delete → save`) nunca deve ser invertida.

### **NFR2 — Independência**
☑️O caso de uso não deve conhecer detalhes internos do `CacheStore`.

### **NFR3 — Estrutura de Tipos**
O `value` deve seguir a interface `PurchasesModel`.

### **NFR4 — Testabilidade**
☑️Toda dependência deve ser mockável.

---

## Business Rules

### **BR1 — Chave de persistência**
A key é obrigatória e deve ser usada como identificador único da persistência.

### **BR2 — Múltiplos saves**
Se a mesma key for salva novamente, o valor anterior deve ser apagado e substituído.

---
