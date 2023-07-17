// Aqui criei uma variável global para armazenar os dados das contas
// adicionei 2 contas de exemplo com 10 transações cada
let accounts = [
  {
    bank: "X",
    agency: "1234",
    accountNumber: "10001",
    initialBalance: 0.00,
    transactions: [
      { date: "02/01/2022", type: "Despesa", category: "Alimentação", description: "Almoço", value: 272.90 },
      { date: "01/02/2022", type: "Despesa", category: "Transporte", description: "Uber", value: 24.70 },
      { date: "08/03/2022", type: "Receita", category: "Compras", description: "Roupas", value: 300 },
      { date: "02/04/2022", type: "Despesa", category: "Compras", description: "Sapatos", value: 78 },
      { date: "01/05/2022", type: "Despesa", category: "Transporte", description: "Uber", value: 254.70 },
      { date: "06/01/2022", type: "Receita", category: "Salário", description: "Salário", value: 3500 },
      { date: "02/02/2023", type: "Despesa", category: "Compras", description: "Roupas", value: 272.90 },
      { date: "01/03/2023", type: "Despesa", category: "Contas", description: "Água", value: 24.70 },
      { date: "01/06/2023", type: "Despesa", category: "Transporte", description: "Uber", value: 50.00 },
      { date: "06/06/2023", type: "Receita", category: "Salário", description: "Salário", value: 1500 }
    ]
  },
  {
    bank: "Y",
    agency: "5678",
    accountNumber: "20002",
    initialBalance: 0.00,
    transactions: [
      { date: "06/02/2023", type: "Despesa", category: "Compras", description: "Supermercado", value: 120.30 },
      { date: "08/02/2023", type: "Receita", category: "Salário", description: "Salário", value: 3200 },
      { date: "10/03/2023", type: "Despesa", category: "Compras", description: "Loja de departamentos", value: 350.00 },
      { date: "07/04/2023", type: "Receita", category: "Cliente", description: "Serviço prestado", value: 2500 },
      { date: "02/05/2023", type: "Despesa", category: "Compras", description: "Roupas", value: 708 },
      { date: "02/02/2023", type: "Despesa", category: "Alimentação", description: "Almoço", value: 272.90 },
      { date: "08/06/2023", type: "Receita", category: "Salário", description: "Salário", value: 300 },
      { date: "02/06/2023", type: "Despesa", category: "Contas", description: "Eletricidade", value: 700 },
      { date: "02/06/2023", type: "Despesa", category: "Contas", description: "Internet", value: 150 },
      { date: "10/06/2023", type: "Receita", category: "Salário", description: "Salário", value: 1000 }

    ]
  }
];
/*********************************SESSÃO GERENCIAMENTO DE CONTAS**************************/
// Captura os elementos HTML necessários da seção gerenciamento de contas
// capturando os selects
const selectAccountRemoval = document.querySelector('#remove_account');
const selectAccount1 = document.querySelector('#account1');
const selectAccount2 = document.querySelector('#account2');
const selectYourAccount = document.querySelector('#selectYourAccount');

const selectTransferFrom = document.querySelector('#select_transfer_from');
const selectTransferTo = document.querySelector('#select_transfer_to');

//capturandos os buttons "Cadastro", "Remover conta" e "Mesclar contas"
const btnRegister = document.querySelector('#register');
const btnRemove = document.querySelector('#remove');
const btnMerge = document.querySelector('#merge');

//*******Esta função é responsável por preencher os selects com os dados da conta********/
function fillSelects() {
  selectAccountRemoval.innerHTML = '';
  selectAccount1.innerHTML = '';
  selectAccount2.innerHTML = '';
  selectYourAccount.innerHTML = '';
  selectTransferTo.innerHTML = '';
  selectTransferFrom.innerHTML = '';

  // Verificando se existem contas armazenadas, se não tiver, os selects serão preenchidos com 
  // a frase "Nenhuma conta adicionada."
  if (accounts.length === 0) {
    const newOptionRemoval = '<option disabled>Nenhuma conta adicionada.</option>';
    selectAccountRemoval.innerHTML += newOptionRemoval;

    const newOption1 = '<option disabled>Nenhuma conta adicionada.</option>';
    const newOption2 = '<option disabled>Nenhuma conta adicionada.</option>';
    selectAccount1.innerHTML += newOption1;
    selectAccount2.innerHTML += newOption2;

    const newOptionYourAccount = '<option disabled>Nenhuma conta adicionada.</option>';
    selectYourAccount.innerHTML += newOptionYourAccount;

    const newOptionTransferTo = '<option disabled>Nenhuma conta adicionada.</option>';
    selectTransferTo.innerHTML += newOptionTransferTo;

    const newOptionTransferFrom = '<option disabled>Nenhuma conta adicionada.</option>';
    selectTransferFrom.innerHTML += newOptionTransferFrom;
    return;
  }

  // Caso tenha alguma conta armazenada, os selects serão preenchidos com as contas
  // o array será percorrido mostrando o nome do banco, número da conta e agência de cada conta
  accounts.forEach((account, index) => {
    const newOptionRemoval = `<option value="${index}">Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}</option>`;
    selectAccountRemoval.innerHTML += newOptionRemoval;

    const newOption1 = `<option value="${index}">Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}</option>`;
    const newOption2 = `<option value="${index}">Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}</option>`;
    selectAccount1.innerHTML += newOption1;
    selectAccount2.innerHTML += newOption2;

    const newOptionYourAccount = `<option value="${index}">Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}</option>`;
    selectYourAccount.innerHTML += newOptionYourAccount;

    const newOptionTransferTo = `<option value="${index}">Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}</option>`;
    selectTransferTo.innerHTML += newOptionTransferTo;

    const newOptionTransferFrom = `<option value="${index}">Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}</option>`;
    selectTransferFrom.innerHTML += newOptionTransferFrom;
  });
}

fillSelects();
//************************CADASTRANDO NOVA CONTA****************************/
// Adiciona um evento de clique ao botão de cadastro
btnRegister.addEventListener('click', () => {
  // Captura os valores adicionados nos campos do formulário (banco, agência e conta)
  const bank = document.querySelector('#bank').value.trim();
  const agency = document.querySelector('#agency').value.trim();
  const accountNumber = document.querySelector('#account_number').value.trim();

  // Verifica se todos os campos foram preenchidos, senão manda um alert
  if (!bank || !agency || !accountNumber) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  // Verifica se a conta já existe (se banco e conta são iguais a alguma já adicionada)
  const existentAccount = accounts.find(account => account.bank ===
    bank && account.accountNumber === accountNumber);
  if (existentAccount) {
    alert('Essa conta já foi adicionada!');
    return;
  }

  // Aqui criei um objeto com os valores capturados e iniciei o saldo como "0"
  // também iniciei as transações com um array vazio, pois novas contas não tem dados ainda
  const newAccount = {
    bank,
    agency,
    accountNumber,
    initialBalance: 0,
    transactions: []
  };

  // Verifica se a nova conta não tem transações e define o saldo inicial como 0.00
  if (newAccount.transactions.length === 0) {
    newAccount.initialBalance = 0.00;
  }

  // Adiciona o objeto na variável global accounts
  accounts.push(newAccount);

  // Limpa os campos do formulário
  document.querySelector('#bank').value = '';
  document.querySelector('#agency').value = '';
  document.querySelector('#account_number').value = '';

  // Atualiza os selects com as novas contas cadastradas
  fillSelects();
  calculateSummary(currentMonth, currentYear);
  calculateLastSixMonths();
  createCategoryChart();
  fillAccountsSummary();

  alert(`Conta adicionada com sucesso!`);
  // Evento para atualizar a conta
  document.dispatchEvent(new Event('accountsUpdated'));
});

//*************************REMOVENDO CONTA*****************************/
// Adiciona um evento de clique ao botão remover conta
btnRemove.addEventListener('click', () => {
  // Captura a conta selecionada no select
  const accountIndex = selectAccountRemoval.value;

  // Verifica se a conta foi selecionada, senão manda um alert
  if (accountIndex === '') {
    alert('Selecione uma conta para remover.');
    return;
  }

  // Mostra um alert ao usuário perguntando se ele deseja prosseguir com a exclusão
  const confirmation = confirm('Tem certeza que deseja excluir essa conta? Todos os dados serão perdidos.');

  // Se o usuário confirmar a exclusão, remove a conta da variável global e atualiza os selects com as contas restantes
  if (confirmation) {
    accounts.splice(accountIndex, 1);
    

    fillSelects();
    calculateSummary(currentMonth, currentYear);
    calculateLastSixMonths();
    createCategoryChart();
    fillAccountsSummary();

    // ao remover esconde as divs de opções
    document.querySelector(".extract").style.display = "none";
    document.querySelector(".lastTransaction").style.display = "none";
    document.querySelector(".addTransaction").style.display = "none";
    document.querySelector(".transferFunds").style.display = "none";

    alert('Conta removida com sucesso!');

    // Emite o evento de atualização de conta
    document.dispatchEvent(new Event('accountsUpdated'));
  }
});

/*****************************MESCLANDO CONTAS********************************/
// Adiciona um evento de clique ao botão mesclar contas
btnMerge.addEventListener('click', () => {
  // Captura os valores dos selects da primeira e segunda conta selecionadas
  const accountIndex1 = selectAccount1.value;
  const accountIndex2 = selectAccount2.value;

  // Verifica se ambos os selects foram preenchidos
  if (accountIndex1 === '' || accountIndex2 === '') {
    alert('Selecione duas contas!');
    return;
  }

  // Verifica se as duas contas selecionadas são iguais
  if (accountIndex1 === accountIndex2) {
    alert('Selecione duas contas DIFERENTES!');
    return;
  }
  // Criando uma nova varíavel para armazenas as contas mescladas
  // Mescla as contas criando uma nova conta
  const newAccount = {
    bank: accounts[accountIndex1].bank,
    agency: accounts[accountIndex1].agency,
    accountNumber: `${accounts[accountIndex1].accountNumber} + ${accounts[accountIndex2].accountNumber}`,
    initialBalance: accounts[accountIndex1].initialBalance + accounts[accountIndex2].initialBalance,
    transactions: [...accounts[accountIndex1].transactions, ...accounts[accountIndex2].transactions]
  };

  // Adiciona a nova conta mescladas na variável global e remove as contas antigas
  accounts.push(newAccount);
  accounts.splice(accountIndex1, 1);
  accounts.splice(accountIndex2 - 1, 1);

  fillSelects();
  calculateSummary();
  calculateLastSixMonths();
  createCategoryChart();
  fillAccountsSummary();

  alert(`Contas foram mescladas com sucesso!`);

  // Emite o evento de atualização de conta
  document.dispatchEvent(new Event('accountsUpdated'));
});
/*********************************SESSÃO GERENCIAMENTO DE TRANSAÇÕES*******************/

//**********************************BUSCAR A CONTA*******************************\\
// Seleciona o botão de busca
const btnSearch = document.getElementById('btnSearch');

// Adiciona um evento de clique ao botão de busca
// ao ser clicado, o extrato, a última transação e a div selecionada nas opções de transação serão mostradas
btnSearch.addEventListener('click', () => {
  // Preenche os elemenos e funções com as transações da conta selecionada
  fillTransactionsTable();
  // showLastTransaction();
  fillAccountsSummary();
  calculateSummary(currentMonth, currentYear);
  calculateLastSixMonths();
  showDivs();
});

//****************FUNÇÃO PARA PREENCHER A TABELA EXTRATO DA CONTA******************\\
function fillTransactionsTable() {
  // captura a tabela de transações
  const table = document.getElementById('table_transactions');

  // pega index da conta selecionada
  const accountIndex = document.getElementById('selectYourAccount').value;

  // Limpa a tabela
  table.tBodies[0].innerHTML = '';

  // Pega as transações da conta selecionada
  const transactions = accounts[accountIndex].transactions;

  // Ordena as transações por data (da mais antiga para a mais recente)
  transactions.sort((a, b) => {
    const aDate = new Date(a.date.split('/').reverse().join('-'));
    const bDate = new Date(b.date.split('/').reverse().join('-'));
    return aDate - bDate;
  });

  // Inicializa o saldo como o saldo inicial da conta selecionada
  let balance = accounts[accountIndex].initialBalance;

  // Preenche a tabela com as transações da conta selecionada
  transactions.forEach(transaction => {
    const row = table.tBodies[0].insertRow(-1);
    // Inserindo as linhas na tabela de acordo com seu índice
    const dateCell = row.insertCell(0);
    const typeCell = row.insertCell(1);
    const categoryCell = row.insertCell(2);
    const descriptionCell = row.insertCell(3);
    const valueCell = row.insertCell(4);
    const balanceCell = row.insertCell(5); // Adiciona a célula de saldo

    // Formatando a data
    // Inserindo os valores nas linhas correspondentes
    const date = new Date(transaction.date);
    const formattedDate = transaction.date;
    dateCell.textContent = formattedDate;
    typeCell.textContent = transaction.type;
    categoryCell.textContent = transaction.category;
    descriptionCell.textContent = transaction.description;
    valueCell.textContent = transaction.value;

    // Atualiza o saldo de acordo com o tipo de transação
    if (transaction.type === 'Despesa') {
      balance -= transaction.value; // Subtrai o valor do saldo atual
      // adiciona classe expense na célula de valor (o valor ficará vermelho)
      valueCell.classList.add('expense');
    } else if (transaction.type === 'Receita') {
      balance += transaction.value; // Adiciona o valor ao saldo atual
      // adiciona classe revenue na célula de valor (o valor ficará verde)
      valueCell.classList.add('revenue');
    }

    // Preenche a célula de saldo com o valor atualizado
    balanceCell.textContent = `R$ ${balance.toFixed(2)}`;

    // Adiciona classe aos saldos negativos
    if (balance < 0) {
      balanceCell.classList.remove('positive');
      balanceCell.classList.add('negative');
    } else {
      balanceCell.classList.remove('negative');
      balanceCell.classList.add('positive');
    }
  });

  // Atualiza o saldo total chamando a função calculateBalance()
  const initialBalance = accounts[accountIndex].initialBalance;
  balance = calculateBalance(transactions, initialBalance);
  const balanceCell = document.getElementById('cell_balance');
  balanceCell.textContent = `R$ ${balance.toFixed(2)}`;

  // Atualiza a cor do saldo total (background vermelho para negativo, verde para positivo)
  if (balance < 0) {
    balanceCell.classList.remove('positive');
    balanceCell.classList.add('negative');
  } else {
    balanceCell.classList.remove('negative');
    balanceCell.classList.add('positive');
  }
}

//***********ESSA FUNÇÃO CALCULA O SALDO TOTAL DAS TRANSAÇÕES DA CONTA************\\
function calculateBalance(transactions, initialBalance) {
  // Inicializa o saldo com o saldo inicial da conta
  let balance = initialBalance;

  // se o tipo da trasação for Receita, o saldo será somado
  // senão será subtraído
  transactions.forEach(transaction => {
    if (transaction.type === 'Receita') {
      balance += transaction.value;
    } else {
      balance -= transaction.value;
    }
  });

  // retorna o saldo final
  return balance;
}

//******FUNÇÃO PARA VERIFICAR SE UMA CONTA FOI SELECIONADA ANTES DE PROSSEGUIR********//
// Obs: Utilizei essa função para que a seleção da conta fosse obrigatório, porém depois pensei em esconder as divs
// e só abrí-las depois de que uma conta fosse selecionada, dessa forma obrigando a ter uma conta selecionada para prosseguir,
// então essa função ficou sem uso
// function accountIsSelected() {
//   if (selectRemoveTransaction.value === '') {
//     alert('Para prosseguir, por favor selecione uma conta.');
//     return false;
//   }
//   return true
// }

//*******************FUNÇÃO PARA MOSTRAR A ÚLTIMA TRANSAÇÃO*******************/
// function showLastTransaction() {
//   // pega index da conta selecionada
//   const accountIndex = document.getElementById('selectYourAccount').value;

//   // Pega as transações da conta selecionada
//   const transactions = accounts[accountIndex].transactions;

//   // Verifica se há transações na conta, senão, mostra a mensagem abaixo
//   if (transactions.length === 0) {
//     document.getElementById('last_transaction').innerHTML = 'Não há transações nesta conta ainda.';
//     return;
//   }

//   // Pega a última transação da lista 
//   const lastTransaction = transactions[transactions.length - 1];

//   // Aqui cria o texto que vai ser exibido na div last-transactions
//   const lastTransactionText = `${lastTransaction.description} em ${lastTransaction.date} no valor de R$ ${lastTransaction.value.toFixed(2)}.`;

//   // Adiciona o texto na div "last-transactions"
//   document.getElementById('last_transaction').innerHTML = lastTransactionText;
// }

//************************EDITAR ÚLTIMO ELEMENTO*************************\\

// Capturando os elementos html necessários para edição do último elemento
const btnEditLastTransaction = document.getElementById("btn_edit_last_transaction");
const inputDateEdit = document.getElementById("input_date_edit");
const selectTypeEdit = document.getElementById("select_type_edit");
const selectCategoryEdit = document.getElementById("select_category_edit");
const inputDescriptionEdit = document.getElementById("input_description_edit");
const inputValueEdit = document.getElementById("input_value_edit");
const lastTransactionText = document.getElementById("last_transaction_text");

// Adiciona um evento de clique ao botão Editar última transação
btnEditLastTransaction.addEventListener("click", () => {

  // Seleciona a conta onde a última transação deve ser editada
  const accountIndex = selectYourAccount.value;

  // Verifica se há transações nessa conta
  if (accounts[accountIndex].transactions.length === 0) {
    alert("Não há transações para editar nesta conta!");
    return;
  }

  // Verifica se todos os campos foram preenchidos
  if (!inputDateEdit.value || !selectTypeEdit.value || !selectCategoryEdit.value ||
    !inputDescriptionEdit.value || !inputValueEdit.value) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Seleciona a última transação adicionada
  const lastTransaction = lastAddedTransaction;

  // Verifica se a última transação existe
  if (!lastTransaction) {
    alert("Não há última transação para editar!");
    return;
  }

  // Formata a data para o fuso horário do Brasil, pois estava pegando a data no formato mm/dd/YYYY
  formattedDateEdit = new Date(inputDateEdit.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  // Atualiza os valores da última transação
  lastTransaction.date = formattedDateEdit;
  lastTransaction.type = selectTypeEdit.value;
  lastTransaction.category = selectCategoryEdit.value;
  lastTransaction.description = inputDescriptionEdit.value;
  lastTransaction.value = parseFloat(inputValueEdit.value);

  // Verifica se há alguma transação adicionada
  if (!lastAddedTransaction) {
    document.querySelector("#last_transaction").innerHTML = "Nenhuma transação adicionada ainda";
    return;
  }

  // Cria um texto com as informações da última transação adicionada
  let lastTransactionText = `${lastAddedTransaction.description} em ${lastAddedTransaction.date} 
    no valor de R$ ${lastAddedTransaction.value.toFixed(2)}.`;
  // Insere o texto na div "last_transaction"
  document.querySelector("#last_transaction").innerHTML = lastTransactionText;

  // Atualiza os valores em outras funções também
  fillTransactionsTable();
  // showLastTransaction();
  fillAccountsSummary();
  calculateSummary(currentMonth, currentYear);
  calculateLastSixMonths();
  createCategoryChart();

  // Mostra a mensagem de sucesso
  alert("A última transação foi editada com sucesso!");

  // Limpa os campos dos inputs após a edição
  inputDateEdit.value = '';
  selectTypeEdit.value = '';
  selectCategoryEdit.value = '';
  inputDescriptionEdit.value = '';
  inputValueEdit.value = '';

});



//*****************************ADICIONANDO TRANSAÇÕES**********************\\
// Variável global para armazenar a última transação adicionada
let lastAddedTransaction = null;
// Captura o botão Adicionar 
const btnAddTransaction = document.querySelector('#btn_add_transaction');
// Atualiza as informações da última transação na div

// Adiciona um evento de clique ao botão "Adicionar transação"
btnAddTransaction.addEventListener('click', () => {
  // Captura os valores dos campos do formulário
  const transactionDate = document.querySelector('#transaction_date').value.trim();
  const transactionType = document.querySelector('#transaction_type').value.trim();
  const transactionCategory = document.querySelector('#transaction_category').value.trim();
  const transactionDescription = document.querySelector('#transaction_description').value.trim();
  const transactionValue = parseFloat(document.querySelector('#transaction_value').value.trim());

  // Verifica se todos os campos foram preenchidos
  if (!transactionDate || !transactionType || !transactionCategory || !transactionDescription || isNaN(transactionValue)) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  // Captura a conta selecionada no select
  const accountIndex = selectYourAccount.value;

  // Formatando a data para o formato dd/mm/YYYY
  formattedDateAdd = new Date(transactionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  // Verifica se há uma última transação adicionada
  if (lastAddedTransaction) {
    // Modifica a última transação adicionada com os dados inseridos no formulário
    lastAddedTransaction.date = formattedDateAdd;
    lastAddedTransaction.type = transactionType;
    lastAddedTransaction.category = transactionCategory;
    lastAddedTransaction.description = transactionDescription;
    lastAddedTransaction.value = transactionValue;

    // Atualiza as informações da última transação na div
    const lastTransactionText = `${lastAddedTransaction.description} em ${lastAddedTransaction.date} no valor de R$ ${lastAddedTransaction.value.toFixed(2)}.`;
    document.querySelector('#last_transaction').innerHTML = lastTransactionText;

    // Reseta a variável global lastAddedTransaction para evitar conflitos
    lastAddedTransaction = null;

    // Exibe mensagem de sucesso
    alert('Última transação adicionada editada com sucesso!');

    // Atualiza tabela, resumo da conta e meses anteriores
    fillTransactionsTable();
    fillAccountsSummary();
    calculateSummary(currentMonth, currentYear);
    calculateLastSixMonths();
    createCategoryChart();

    // Limpa os campos do formulário
    document.querySelector('#transaction_date').value = '';
    document.querySelector('#transaction_type').value = '';
    document.querySelector('#transaction_category').value = '';
    document.querySelector('#transaction_description').value = '';
    document.querySelector('#transaction_value').value = '';

    return;
  }

  // Adiciona a nova transação na variável global
  accounts[accountIndex].transactions.push({
    date: formattedDateAdd,
    type: transactionType,
    category: transactionCategory,
    description: transactionDescription,
    value: transactionValue
  });

  // Atualiza a variável global com a última transação adicionada
  lastAddedTransaction = accounts[accountIndex].transactions.slice(-1)[0];

  // Formata as informações da última transação
  const lastTransactionText = `${lastAddedTransaction.description} em ${lastAddedTransaction.date} no valor de R$ ${lastAddedTransaction.value.toFixed(2)}.`;

  // Exibe as informações da última transação na div
  document.querySelector('#last_transaction').innerHTML = lastTransactionText;


  // Limpa os campos do formulário após o clique no botão
  document.querySelector('#transaction_date').value = '';
  document.querySelector('#transaction_type').value = '';
  document.querySelector('#transaction_category').value = '';
  document.querySelector('#transaction_description').value = '';
  document.querySelector('#transaction_value').value = '';

  // Atualiza os valores e mostra a mensagem de sucesso
  fillTransactionsTable();
  fillAccountsSummary();
  createCategoryChart();
  calculateSummary(currentMonth, currentYear);
  calculateLastSixMonths();

  alert('Transação adicionada com sucesso!');
});
/******************************TRANSFERINDO FUNDOS********************************/
const btnTransferFunds = document.querySelector('#btn_transfer_funds');

// Adiciona um evento ao clicar no botão Transferir fundos
btnTransferFunds.addEventListener('click', () => {
  // Capturando os valores do formulário
  const transferFromIndex = document.querySelector('#select_transfer_from').value;
  const transferToIndex = document.querySelector('#select_transfer_to').value;
  const transferValue = Number(document.querySelector('#input_transfer_value').value);

  // Aqui pega o saldo da conta de origem com a função calculateBalance()
  const balanceTransferFrom = calculateBalance(accounts[transferFromIndex].transactions, accounts[transferFromIndex].initialBalance);

  const transferFromAccount = accounts[transferFromIndex];
  const transferToAccount = accounts[transferToIndex];

  // Verifica se as contas são iguais
  if (transferFromIndex === transferToIndex) {
    alert('Contas iguais, por favor, insira contas diferentes para a transferência.')
    return
  }
  // Verifica se o valor da transferência é 0 ou negativo
  if (transferValue <= 0) {
    alert('Informe o valor da transferência.');
    return;
  }
  // Se o valor de transferência for maior que valor do saldo, não poderá ser feita a transferência
  if (transferValue > balanceTransferFrom) {
    alert(`Você não tem saldo suficiente para fazer a transferência. Seu saldo: ${balanceTransferFrom}`);
    return;
  }

  // Descrição para o saque (Despesa) e para o depósito (Receita).
  const expenseDescription = `Para banco ${transferToAccount.bank} Ag. ${transferToAccount.agency} - C. ${transferToAccount.accountNumber}`;
  const revenueDescription = `Do banco ${transferFromAccount.bank} Ag. ${transferFromAccount.agency} - C. ${transferFromAccount.accountNumber}`;

  // Cria as transações de saque e depósito, adicionando a descrição, o tipo e o valor transferido.
  const transferExpense = {
    //pegando a data atual
    date: new Date().toLocaleDateString('pt-BR'),
    type: 'Despesa',
    category: 'Transferência',
    description: expenseDescription,
    value: transferValue
  };

  const transferRevenue = {
    date: new Date().toLocaleDateString('pt-BR'),
    type: 'Receita',
    category: 'Transferência',
    description: revenueDescription,
    value: transferValue
  };

  // Adiciona as transações para as contas de origem e destino.
  accounts[transferFromIndex].transactions.push(transferExpense);
  accounts[transferToIndex].transactions.push(transferRevenue);

  // Atualiza o saldo das contas de origem e destino 
  // (subtraindo o valor transferido da conta de origem e somando na conta de destino).
  accounts[transferFromIndex].initialBalance == transferValue;
  accounts[transferToIndex].initialBalance == transferValue;

  // Atualiza os valores
  fillSelects();
  calculateSummary(currentMonth, currentYear);
  calculateLastSixMonths();
  createCategoryChart();
  fillAccountsSummary();

  document.querySelector('#input_transfer_value').value = '';

  alert('Transferência realizada com sucesso!');

  // Evento de atualização de conta.
  document.dispatchEvent(new Event('accountsUpdated'));

  // Saque receberá a classe expense (letra vermelha) e saque a classe revenue (letra verde).
  const expenseCells = Array.from(document.querySelectorAll('.transaction-list tbody tr:last-child td'));
  expenseCells[1].classList.add('expense');
  const revenueCells = Array.from(document.querySelectorAll('.transaction-list tbody tr:nth-last-child(2) td'));
  revenueCells[1].classList.add('revenue');
});

//***********************************SEÇÃO PAINEL GERAL***********************************\\
// Seleciona o elemento HTML
const monthSummaryTable = document.getElementById('month_summary');

//**********************CALCULANDO A SOMA DO SALDO DE TODAS AS CONTAS**********************\\
function fillAccountsSummary() {
  // Seleciona o elemento HTML que irá mostrar o resumo das contas
  const accountsSummary = document.getElementById('accounts_summary');
  let total = 0;

  accountsSummary.innerHTML = '';
  // Percorrendo o array de contas
  accounts.forEach(account => {
    // Preenchendo a tabela com os valores
    const row = accountsSummary.insertRow(-1);
    const accountNumberCell = row.insertCell(0);
    const balanceCell = row.insertCell(1);
    // Adiciona os dados da conta na primeira coluna da linha criada
    accountNumberCell.textContent = `Banco ${account.bank} Ag. ${account.agency} - C. ${account.accountNumber}`;
    // Calcula o saldo da conta 
    const balance = calculateBalance(account.transactions, account.initialBalance);
    balanceCell.textContent = `R$ ${balance.toFixed(2)}`;
    // Soma o saldo de todas as contas
    total += balance;
  });
  // Aqui será mostrado o valor total do saldo
  const totalBalance = document.getElementById('total_balance');
  totalBalance.textContent = `R$ ${total.toFixed(2)}`;

}

fillAccountsSummary();

/******************************RECEITAS E DESPESAS DO MÊS****************************/

/************FUNÇÃO PARA CALCULAR AS RECEITAS E DESPESAS DO MÊS ATUAL****************/
// Recebe como parâmetro o mês e ano atual
function calculateSummary(month, year) {
  // Define os totais de receitas e despesas como zero
  let totalReceitas = 0;
  let totalDespesas = 0;

  // Percorre as transações de todas as contas
  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    for (let j = 0; j < account.transactions.length; j++) {
      let transaction = account.transactions[j];

      // mudando o formato da data de mm/dd/YYYY para o formato brasileiro dd/mm/YYYY
      let [dia, mes, ano] = transaction.date.split('/').map(Number);
      let data = new Date(ano, mes - 1, dia + 1);
      data.setTime(data.getTime() - data.getTimezoneOffset() * 60 * 1000);

      // Verifica se a transação é do mês e ano atual
      if (data.getMonth() === month && data.getFullYear() === year) {
        if (transaction.type === 'Receita') {
          // Se for do tipo Receita, soma ao total de receitas
          totalReceitas += transaction.value;
        }
        if (transaction.type === 'Despesa') {
          // Se for do tipo Despesa, soma ao total de despesas
          totalDespesas += transaction.value;
        }
      }
    }
  }
  // Calcula o saldo do mês atual
  let saldo = totalReceitas - totalDespesas;
  // Formata os valores
  const format = (val) => Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  // Atualiza os valores na tabela HTML
  let month_summary = document.querySelector('#month_summary');
  month_summary.innerHTML = `
    <tr>
      <td>R$ ${format(totalReceitas)}</td>
      <td>R$ ${format(totalDespesas)}</td>
      <td>R$ ${format(saldo)}</td>
    </tr>
  `;

  // Atualiza o mês na tabela HTML
  let currentMonth = document.querySelector('#currentMonth');
  currentMonth.innerHTML = `${month + 1}/${year}`;
}

// Pegando o mês e ano atual
let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

// Passando o mês e ano atual como parâmetros
calculateSummary(currentMonth, currentYear);

/***************FUNÇÃO PARA PROCURAR AS DESPESAS E RECEIRAS DE OUTROS MESES**********/
// Captura os elementos do HTML
const selectMonth = document.querySelector('#select_month');
const btnMonth = document.querySelector('#btnMonth');

// Adiciona evento de clique no botão "Buscar outros meses"
btnMonth.addEventListener('click', function () {
  // Obtém o mês selecionado no select
  const selectedMonth = selectMonth.value;
  // Define o mês selecionado como o mês atual
  let currentMonth;

  switch (selectedMonth) {
    case 'january':
      currentMonth = 0;
      break;
    case 'february':
      currentMonth = 1;
      break;
    case 'march':
      currentMonth = 2;
      break;
    case 'april':
      currentMonth = 3;
      break;
    case 'may':
      currentMonth = 4;
      break;
    case 'june':
      currentMonth = 5;
      break;
    case 'july':
      currentMonth = 6;
      break;
    case 'august':
      currentMonth = 7;
      break;
    case 'september':
      currentMonth = 8;
      break;
    case 'october':
      currentMonth = 9;
      break;
    case 'november':
      currentMonth = 10;
      break;
    case 'dezember':
      currentMonth = 11;
      break;
    default:
      break;
  }

  // Define o ano atual
  let currentYear = new Date().getFullYear();
  // Chama a função calculateSummary com o mês e ano atualizados
  calculateSummary(currentMonth, currentYear);
  // Atualiza o cabeçalho do mês correspondente no HTML
  const monthHeader = document.querySelector('#currentMonth');
  monthHeader.innerHTML = `${currentMonth + 1}/${currentYear}`;

});

//***********AQUI COLOCO O NOME DO MÊS ATUAL NO RESUMO DE RECEITAS E DESPESAS*********//
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Pegando a data atual
const currentDateSummary = new Date();
const currentMonthSummary = currentDateSummary.getMonth();
// Colocando o mês atual no elemento HTML
const currentMonthText = document.querySelector('#currentMonthText');
currentMonthText.textContent = months[currentMonthSummary];

//*****************FUNÇÃO PARA CALCULAR A SOMA DO SALDO DOS ÚTIMOS 6 MESES***************//
function calculateLastSixMonths() {
  // Pegando a data atual
  const today = new Date();
  // Pegando a data dos últimos 6 meses
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
  // Objeto para armazenar os saldos das contas
  const accountBalances = {};

  // Percorre as contas e calcula o saldo dos últimos 6 meses
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    let balance = 0;

    for (let j = 0; j < account.transactions.length; j++) {
      const transaction = account.transactions[j];
      const [dia, mes, ano] = transaction.date.split('/').map(Number);
      const transactionDate = new Date(ano, mes - 1, dia);

      // Verifica se a transação ocorreu nos últimos 6 meses
      if (
        transactionDate >= sixMonthsAgo &&
        transactionDate <= today
      ) {
        if (transaction.type === 'Receita') {
          balance += transaction.value;
        }
        if (transaction.type === 'Despesa') {
          balance -= transaction.value;
        }
      }
    }
    // O saldo da conta vai para o objeto accountBalances
    accountBalances[account.accountNumber] = balance;
  }

  // Elemento da tabela para mostrar os valores
  const accountsBalanceEl = document.getElementById('accounts_balance_6');
  accountsBalanceEl.innerHTML = '';

  let totalBalance = 0;

  // Percorre o objeto accountBalances e adiciona o saldo de cada conta na tabela
  for (const accountNumber in accountBalances) {
    const balance = accountBalances[accountNumber];
    const formattedBalance = balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    accountsBalanceEl.innerHTML += `
      <tr>
        <td>${accountNumber}</td>
        <td>${formattedBalance}</td>
      </tr>
    `;
    totalBalance += balance;
  }

  // Atualiza o valor total da tabela
  const formattedTotal = totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

calculateLastSixMonths();

//******************FUNÇÃO PARA APARECER AS DIVS DE ACORDO COM O BOTÃO SELECIONADO************/
const btn_Register = document.getElementById("btn-register");
const btn_Remove = document.getElementById("btn-Remove");
const btn_Merge = document.getElementById("btn-merge");
const divRegister = document.querySelector(".register");
const divRemove = document.querySelector(".remove");
const divMerge = document.querySelector(".merge");

// Ocultar todas as divs no início
divRegister.style.display = "none";
divRemove.style.display = "none";
divMerge.style.display = "none";

// Mostrar divRegister e ocultar divs restantes ao clicar no botão "CADASTRAR"
btn_Register.addEventListener("click", function () {
  divRegister.style.display = "block";
  divRemove.style.display = "none";
  divMerge.style.display = "none";
});

// Mostrar divRemove e ocultar divs restantes ao clicar no botão "REMOVER"
btn_Remove.addEventListener("click", function () {
  divRegister.style.display = "none";
  divRemove.style.display = "block";
  divMerge.style.display = "none";
});

// Mostrar divMerge e ocultar divs restantes ao clicar no botão "MESCLAR"
btn_Merge.addEventListener("click", function () {
  divRegister.style.display = "none";
  divRemove.style.display = "none";
  divMerge.style.display = "block";
});

function showDivs() {
  // Pega a opção selecionada no select
  const selectedOption = document.getElementById("select-transaction").value;
  // Exibindo o painel geral

  switch (selectedOption) {
    case "optionExtract":
      // Mostra o painel de extrato e esconde os demais
      document.querySelector(".extract").style.display = "block";
      document.querySelector(".lastTransaction").style.display = "none";
      document.querySelector(".addTransaction").style.display = "none";
      document.querySelector(".transferFunds").style.display = "none";
      break;
    case "optionLastTransaction":
      // Mostra o painel editar última transação e esconde os demais
      document.querySelector(".lastTransaction").style.display = "block";
      document.querySelector(".extract").style.display = "none";
      document.querySelector(".addTransaction").style.display = "none";
      document.querySelector(".transferFunds").style.display = "none";
      break;
    case "optionAddTransaction":
      // Mostra o painel adicionar transação e esconde os demais
      document.querySelector(".addTransaction").style.display = "block";
      document.querySelector(".lastTransaction").style.display = "none";
      document.querySelector(".extract").style.display = "none";
      document.querySelector(".transferFunds").style.display = "none";
      break;
    case "optionTransferFunds":
      // Mostra o painel transferir fundos e esconde os demais
      document.querySelector(".transferFunds").style.display = "block";
      document.querySelector(".lastTransaction").style.display = "none";
      document.querySelector(".extract").style.display = "none";
      document.querySelector(".addTransaction").style.display = "none";
      break;
    default:
      break;
  }
}

/******************FUNÇÃO PARA CRIAR UM GRÁFICO DE DESPESAS POR CATEGORIA************/
function createCategoryChart() {
  // Percorre as transações de todas as contas e junta os valores por categoria
  const categories = {};
  accounts.forEach(account => {
    account.transactions.forEach(transaction => {
      if (transaction.type === "Despesa") {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += transaction.value;
      }
    });
  });

  // Ordena os resultados por valor decrescente
  const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  // Captura a div do gráfico e limpa seu conteúdo atual
  const chart = document.getElementById('category-chart');
  chart.innerHTML = '';

  // Cria e adiciona uma barra vermelha para cada categoria, contendo nome e valor
  sortedCategories.forEach(category => {
    const bar = document.createElement('div');
    const name = document.createElement('span');
    const value = document.createElement('span');
    // Adicionando a classe do css
    bar.classList.add('bar');
    name.textContent = category[0];
    value.textContent = `R$ ${category[1].toFixed(2)}`;
    // Define a largura da barra em porcentagem de acordo com o valor do total
    const total = Object.values(categories).reduce((prev, curr) => prev + curr, 0);
    const percentage = (category[1] / total) * 100;
    bar.style.width = `${percentage}%`;

    bar.appendChild(name);
    bar.appendChild(value);
    chart.appendChild(bar);
  });
}

createCategoryChart();

