import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class PostMessageTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.get("http://mern-app:3000/")

    def test_can_post_message(self):
        input_box = self.driver.find_element(By.NAME, "message")
        input_box.send_keys("Hello from Selenium!" + Keys.ENTER)
        # assume new message shows up in <li class="message-item">
        items = self.driver.find_elements(By.CSS_SELECTOR, "li.message-item")
        self.assertTrue(any("Hello from Selenium!" in i.text for i in items))

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()
