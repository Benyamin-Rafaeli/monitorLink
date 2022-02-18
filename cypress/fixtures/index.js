fetch('./2_test.json')
  .then(data => {
    return data.json();
  })
  .then(readyData => {
    const container = document.getElementById('example');
    // const columns = ['hashtag', 'website', 'linkedinCounter', 'tralivali'];
    const columns = Object.keys(readyData[0]);

    const hot = new Handsontable(container, {
      data: readyData,
      rowHeaders: true,
      colHeaders: columns,
      height: 'auto',
      licenseKey: 'non-commercial-and-evaluation',
      columns: columns.map(column => ({ data: column, editor: false })),
      columnSorting: {
        sortEmptyCells: true,
        initialConfig: {
          column: 2,
          sortOrder: 'asc',
        },
      },
    });
    // console.log(readyData);
  });
