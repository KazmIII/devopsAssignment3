import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class HomepageTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.get("http://mern-app:3000/")

    def test_title_contains_messageboard(self):
        self.assertIn("Message Board", self.driver.title)

    def test_header_visible(self):
        header = self.driver.find_element(By.TAG_NAME, "h1")
        self.assertTrue(header.is_displayed())

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()
