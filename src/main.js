//ini adalah script start server
import web  from './application/web.js'; 

const port =  3002;

try {
    web.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Gagal menjalankan server:', error);
  }