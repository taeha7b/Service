from .product_view import ProductsView
from .search_view  import SearchView
from .user_view import SignUp, SignIn

def create_endpoints(app, services):
    product_service = services.product_service
    search_service  = services.search_service
    user_service = services.user_service
    # 작성자: 김기욱
    # 수정일: 2020.09.23 수
    # 스토어 검색 endpoint 구현
    # 작성일: 2020.09.22.화
    # 상품 전체 데이터 endpoint
    app.add_url_rule('/products', view_func = ProductsView.as_view('products', product_service))
    app.add_url_rule('/search', view_func=SearchView.as_view('search', search_service))
    # 작성자: 김태하
    # 작성일: 2020.09.23.수
    # 기능: 회원가입
    app.add_url_rule('/sign-up', view_func = SignUp.as_view('user_sign_up', user_service))
    app.add_url_rule('/sign-in', view_func = SignIn.as_view('user_sign_in', user_service))
