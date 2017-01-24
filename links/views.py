from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from links.models import Post
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):

    post_set = Post.objects.order_by('seen','-id')

    if request.method == 'POST':
        print('form submitted')
        num = request.POST.get('number')
        print(num)

    return render(request, 'links/index.html', {'post_set': post_set})


def link_seen(request):
    print('link_seen called')
    response = {}

    if request.method == 'POST':
        print(int(request.POST.get('id')))
        post = Post.objects.get(pk=int(request.POST.get('id')))
        print(post)
        print(request.POST.get('viewed'))

        post.seen = True
        post.viewed = str(request.POST.get('viewed'))[0:15]
        print(post.viewed)
        post.save()

        response['title'] = post.title
        response['viewed'] = post.viewed

        print('returning Json Response')
        return JsonResponse(response)


def link_delete(request):
    print('link_delete called')
    response = {}

    if request.method == 'POST':
        post = Post.objects.get(pk=int(request.POST.get('id')))
        print(post)

        post.delete()
        #post.save()

        print('returning Json Response')
        return JsonResponse(response)



def link_add(request):
    print('add_link called')
    response = {}
    if request.method == 'POST':
        title = request.POST.get('title')
        link = request.POST.get('link')
        print(title)
        print(link)

        post = Post(title=title, link=link)
        print(post)
        post.save()

        response['title'] = post.title
        response['link'] = post.link
        response['id'] = post.id

        return JsonResponse(response)



# Login Page.  Allow Lindsay to log in and no one else.
def user_login(request):
    print('login called')
    if request.method == 'POST':
        print('POST')

        name = request.POST.get('username')
        password = request.POST.get('password')

        print(name)
        print(password)

        user = authenticate(username=name, password=password)

        if user:
            if user.is_active:
                # If the account is valid and active, log the user in
                login(request, user)
                return HttpResponseRedirect('/')
        else:
            print("Invalid login details: {0}, {1}".format(name, password))
            return render(request, 'links/login.html', {'feedback': 'Invalid login details supplied', 'pass': password})

    return render(request, 'links/login.html')

def user_logout(request):
    logout(request)

    return HttpResponseRedirect('/')

def acknowledge_init(request):
    print('ajax_request called')
    response = {}

    response['data'] = 'fuck the police'

    print('returning Json Response')
    return JsonResponse(response)