# Requirements – LocalLoadPurchases

## Overview
O caso de uso deve carregar a lista de compras armazenadas localmente, associadas a uma key.

---

## Functional Requirements

### **FR1 — Carregar dados do cache**
☑️O sistema deve buscar compras existentes usando a key fornecida.

### **FR2 — Retornar lista vazia quando não houver dados**
☑️Se a key não existir no cache, deve retornar uma lista vazia.

### **FR3 — Propagar erros**
☑️Qualquer erro na operação `fetch` deve ser repassado ao chamador.

---

## Non-Functional Requirements

### **NFR1 — Independência**
☑️O caso de uso não deve conhecer detalhes concretos do cache.

### **NFR2 — Estrutura de dados consistente**
☑️O retorno deve sempre ser `PurchasesModel`.

---

## Business Rules

### **BR1 — Key é obrigatória**
☑️A key define o conjunto único de compras salvas.

---
